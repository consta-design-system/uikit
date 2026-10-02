import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { ColorPickerBase } from '../ColorPickerBase';
import { hsvaModel } from '../models/hsvaModel';
import { HsvaColor } from '../types';

createRoot();
clearStack();

type ColorPickerBaseProps<T> = React.ComponentProps<typeof ColorPickerBase<T>>;

const testId = 'ColorPickerBase';

const renderComponent = <T,>(
  ctx: TestContext,
  props: ColorPickerBaseProps<T>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerBase<T> data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Компонент ColorPickerBase', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const value: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      const render = () =>
        renderComponent(ctx, {
          model: hsvaModel,
          value,
          onChange: vi.fn(),
        });

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    const value: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            className,
          });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            style,
          });

          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });

    describe('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            ref,
          });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe('проверка alpha', () => {
      test('при alpha=true рендерится ColorPickerAlpha', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            alpha: true,
          });

          // ColorPickerAlpha имеет класс ColorPickerAlpha
          const alphaElement =
            getRender(ctx).querySelector('.ColorPickerAlpha');
          expect(alphaElement).toBeInTheDocument();
        }));

      test('при alpha=false не рендерится ColorPickerAlpha', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, {
            model: hsvaModel,
            value,
            onChange: vi.fn(),
            alpha: false,
          });

          const alphaElement =
            getRender(ctx).querySelector('.ColorPickerAlpha');

          expect(alphaElement).not.toBeInTheDocument();
        }));
    });
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onChange при изменении saturation', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, {
          model: hsvaModel,
          value: { h: 0, s: 50, v: 50, a: 1 },
          onChange,
          alpha: false,
        });

        // Находим слайдер saturation (первый слайдер)
        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const saturationSlider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(saturationSlider, { keyCode: 39 }); // ArrowRight
        expect(onChange).toHaveBeenCalledTimes(1);
        // Проверяем, что onChange вызван с объектом, содержащим s и v
        expect(onChange.mock.calls[0][0]).toMatchObject({
          s: expect.closeTo(55, 0),
          v: expect.closeTo(50, 0),
        });
      }));

    test('вызывает onChange при изменении hue', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, {
          model: hsvaModel,
          value: { h: 180, s: 50, v: 50, a: 1 },
          onChange,
          alpha: false,
        });

        // Hue слайдер второй по порядку
        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const hueSlider = sliders[1] as HTMLInputElement;
        fireEvent.keyDown(hueSlider, { keyCode: 39 }); // ArrowRight
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toMatchObject({
          h: expect.closeTo(198, 0),
        });
      }));

    test('вызывает onChange при изменении alpha, если alpha=true', (ctx) =>
      context.start(async () => {
        const onChange = vi.fn();
        renderComponent(ctx, {
          model: hsvaModel,
          value: { h: 0, s: 0, v: 0, a: 0.5 },
          onChange,
          alpha: true,
        });

        // Alpha слайдер третий
        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const alphaSlider = sliders[2] as HTMLInputElement;
        fireEvent.keyDown(alphaSlider, { keyCode: 39 }); // ArrowRight
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toMatchObject({
          a: expect.closeTo(0.55, 2),
        });
      }));
  });
});

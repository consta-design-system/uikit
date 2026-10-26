import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSaturation, ColorPickerSaturation } from '../ColorPickerSaturation';
import { HsvaColor } from '../types';

createRoot();
clearStack();

type ColorPickerSaturationProps = React.ComponentProps<
  typeof ColorPickerSaturation
>;

const testId = cnSaturation();

const renderComponent = (
  ctx: TestContext,
  props: ColorPickerSaturationProps,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerSaturation data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Компонент ColorPickerSaturation', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 1 };
      const render = () =>
        renderComponent(ctx, {
          hsva,
          onChange: vi.fn(),
        });

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    const hsva: HsvaColor = { h: 120, s: 50, v: 75, a: 1 };

    describe('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, { hsva, onChange: vi.fn(), className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, { hsva, onChange: vi.fn(), style });

          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });

    describe('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, { hsva, onChange: vi.fn(), ref });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe('проверка фона', () => {
      test('устанавливает корректный цвет фона на основе hue', (ctx) =>
        context.start(async () => {
          const hsva = { h: 180, s: 100, v: 100, a: 1 };
          renderComponent(ctx, { hsva, onChange: vi.fn() });

          const element = getRender(ctx);
          expect(element).toHaveStyle({
            backgroundColor: 'hsl(180, 100%, 50%)',
          });
        }));
    });

    describe('проверка позиции указателя', () => {
      test('позиция указателя корректно вычисляется по s и v', (ctx) =>
        context.start(async () => {
          const hsva = { h: 0, s: 30, v: 60, a: 1 };
          renderComponent(ctx, { hsva, onChange: vi.fn() });

          const sliders = document.querySelectorAll(
            `#${testRootId(ctx)} [role="slider"]`,
          );
          const slider = sliders[0] as HTMLInputElement;
          const pointer = slider.querySelector('[class*="Pointer"]');
          expect(pointer).toHaveStyle({
            left: `${hsva.s}%`,
            top: `${(1 - hsva.v / 100) * 100}%`,
          });
        }));
    });
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onChange при нажатии клавиш стрелок', (ctx) =>
      context.start(async () => {
        const hsva: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        const onChange = vi.fn();
        renderComponent(ctx, { hsva, onChange });

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          s: expect.closeTo(55, 0),
          v: expect.closeTo(50, 0),
        });
      }));

    test('вызывает onChange при нажатии стрелки вниз', (ctx) =>
      context.start(async () => {
        const hsva: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        const onChange = vi.fn();
        renderComponent(ctx, { hsva, onChange });

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(slider, { keyCode: 40 }); // ArrowDown

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({
          s: expect.closeTo(50, 0),
          v: expect.closeTo(45, 0),
        });
      }));

    test('вызывает onChange при перемещении указателя', (ctx) =>
      context.start(async () => {
        const hsva: HsvaColor = { h: 0, s: 50, v: 50, a: 1 };
        const onChange = vi.fn();
        renderComponent(ctx, { hsva, onChange });

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.mouseDown(slider, { clientX: 100, clientY: 100 });
        fireEvent.mouseMove(slider, { clientX: 200, clientY: 200 });
        fireEvent.mouseUp(slider);

        expect(onChange).toHaveBeenCalled();
      }));
  });
});

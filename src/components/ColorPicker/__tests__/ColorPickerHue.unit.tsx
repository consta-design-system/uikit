import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnColorPickerHue, ColorPickerHue } from '../ColorPickerHue';

createRoot();
clearStack();

type ColorPickerHueProps = React.ComponentProps<typeof ColorPickerHue>;

const testId = cnColorPickerHue();

const renderComponent = (ctx: TestContext, props: ColorPickerHueProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerHue data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Компонент ColorPickerHue', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, {
          hue: 180,
          onChange: vi.fn(),
        });

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    const hue = 120;

    describe('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, { hue, onChange: vi.fn(), className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, { hue, onChange: vi.fn(), style });

          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });

    describe('проверка ref', () => {
      test('ref присваивается элементу', (ctx) =>
        context.start(async () => {
          const ref = React.createRef<HTMLDivElement>();
          renderComponent(ctx, { hue, onChange: vi.fn(), ref });

          expect(ref.current).toBe(getRender(ctx));
        }));
    });

    describe('проверка hue', () => {
      test('позиция указателя корректно вычисляется', (ctx) =>
        context.start(async () => {
          const hue = 270;
          renderComponent(ctx, { hue, onChange: vi.fn() });

          const sliders = document.querySelectorAll(
            `#${testRootId(ctx)} [role="slider"]`,
          );
          const slider = sliders[0] as HTMLInputElement;
          const pointer = slider.querySelector('[class*="Pointer"]');
          expect(pointer).toHaveStyle({ left: `${(hue / 360) * 100}%` });
        }));
    });
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onChange при клике на левую кнопку', (ctx) =>
      context.start(async () => {
        const hue = 180;
        const onChange = vi.fn();
        renderComponent(ctx, { hue, onChange });

        const buttons = document.querySelectorAll(
          `#${testRootId(ctx)} [role="button"]`,
        );
        const leftButton = buttons[0] as HTMLButtonElement;
        fireEvent.click(leftButton);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ h: 0 });
      }));

    test('вызывает onChange при клике на правую кнопку', (ctx) =>
      context.start(async () => {
        const hue = 180;
        const onChange = vi.fn();
        renderComponent(ctx, { hue, onChange });

        const buttons = document.querySelectorAll(
          `#${testRootId(ctx)} [role="button"]`,
        );
        const rightButton = buttons[1] as HTMLButtonElement;
        fireEvent.click(rightButton);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ h: 360 });
      }));

    test('вызывает onChange при нажатии клавиш стрелок', (ctx) =>
      context.start(async () => {
        const hue = 180;
        const onChange = vi.fn();
        renderComponent(ctx, { hue, onChange });

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ h: expect.closeTo(198, 0) });
      }));

    test('вызывает onChange при перемещении указателя', (ctx) =>
      context.start(async () => {
        const hue = 180;
        const onChange = vi.fn();
        renderComponent(ctx, { hue, onChange });

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.mouseDown(slider, { clientX: 100, clientY: 10 });
        // Симуляция движения мыши
        fireEvent.mouseMove(slider, { clientX: 200, clientY: 10 });
        fireEvent.mouseUp(slider);

        expect(onChange).toHaveBeenCalled();
      }));
  });
});

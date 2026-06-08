import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { ColorPickerAlpha } from '../ColorPickerAlpha';
import { HsvaColor } from '../types';

createRoot();
clearStack();

type ColorPickerAlphaProps = React.ComponentProps<typeof ColorPickerAlpha>;

const testId = 'ColorPickerAlpha';

const renderComponent = (ctx: TestContext, props: ColorPickerAlphaProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerAlpha data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Компонент ColorPickerAlpha', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
      const render = () =>
        renderComponent(ctx, {
          hsva,
          onChange: vi.fn(),
        });

      expect(render).not.toThrow();
    }));

  describe('проверка props', () => {
    const hsva: HsvaColor = { h: 120, s: 50, v: 75, a: 0.3 };

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

    describe('проверка градиента', () => {
      test('устанавливает CSS переменную --color-picker-alpha-gradient', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { hsva, onChange: vi.fn() });

          const gradient = getRender(ctx).style.getPropertyValue(
            '--color-picker-alpha-gradient',
          );
          expect(gradient).toContain('hsla');
        }));

      test('градиент корректно вычисляется для hsva', (ctx) =>
        context.start(async () => {
          const hsva = { h: 0, s: 100, v: 100, a: 0.5 };
          renderComponent(ctx, { hsva, onChange: vi.fn() });

          const element = getRender(ctx);
          const gradient = element.style.getPropertyValue(
            '--color-picker-alpha-gradient',
          );
          expect(gradient).toMatch(/hsla\(0,\s*100%,\s*50%,\s*0\)/);
          expect(gradient).toMatch(/hsla\(0,\s*100%,\s*50%,\s*1\)/);
        }));
    });
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onChange при клике на левую кнопку', (ctx) =>
      context.start(async () => {
        const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
        const onChange = vi.fn();
        renderComponent(ctx, { hsva, onChange });

        const buttons = document.querySelectorAll(
          `#${testRootId(ctx)} [role="button"]`,
        );
        const leftButton = buttons[0] as HTMLButtonElement;
        fireEvent.click(leftButton);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ a: 0 });
      }));

    test('вызывает onChange при клике на правую кнопку', (ctx) =>
      context.start(async () => {
        const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
        const onChange = vi.fn();
        renderComponent(ctx, { hsva, onChange });

        const buttons = document.querySelectorAll(
          `#${testRootId(ctx)} [role="button"]`,
        );
        const rightButton = buttons[1] as HTMLButtonElement;
        fireEvent.click(rightButton);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ a: 1 });
      }));

    test('вызывает onChange при нажатии клавиш стрелок', (ctx) =>
      context.start(async () => {
        const hsva: HsvaColor = { h: 0, s: 0, v: 0, a: 0.5 };
        const onChange = vi.fn();
        renderComponent(ctx, { hsva, onChange });

        const slider = document.querySelector(
          `#${testRootId(ctx)} [role="slider"]`,
        ) as HTMLInputElement;
        fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ a: expect.closeTo(0.55, 2) });
      }));
  });
});

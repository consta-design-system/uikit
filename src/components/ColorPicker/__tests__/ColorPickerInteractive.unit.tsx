import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import {
  cnColorPickerInteractive,
  ColorPickerInteractive,
} from '../ColorPickerInteractive';

createRoot();
clearStack();

type ColorPickerInteractiveProps = React.ComponentProps<
  typeof ColorPickerInteractive
>;

const testId = cnColorPickerInteractive();

const renderComponent = (
  ctx: TestContext,
  props: Omit<ColorPickerInteractiveProps, 'children'>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ColorPickerInteractive data-testid={testId} {...props}>
            {null}
          </ColorPickerInteractive>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe.concurrent('Компонент ColorPickerInteractive', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = () =>
        renderComponent(ctx, {
          onMove: vi.fn(),
          onKey: vi.fn(),
        });
      await wrap(tick());
      expect(render).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка className', () => {
      test('присваивает дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'custom-class';
          renderComponent(ctx, { onMove: vi.fn(), onKey: vi.fn(), className });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка style', () => {
      test('присваивает дополнительные стили', (ctx) =>
        context.start(async () => {
          const style = { color: 'red' };
          renderComponent(ctx, { onMove: vi.fn(), onKey: vi.fn(), style });
          await wrap(tick());
          expect(getRender(ctx)).toHaveStyle(style);
        }));
    });
  });

  describe.concurrent('проверка взаимодействия', () => {
    test('вызывает onMove при клике на левую кнопку', (ctx) =>
      context.start(async () => {
        const onMove = vi.fn();
        renderComponent(ctx, { onMove, onKey: vi.fn() });
        await wrap(tick());

        const buttons = document.querySelectorAll(
          `#${testRootId(ctx)} [role="button"]`,
        );
        const leftButton = buttons[0] as HTMLButtonElement;
        fireEvent.click(leftButton);

        expect(onMove).toHaveBeenCalledTimes(1);
        expect(onMove).toHaveBeenCalledWith({ left: 0, top: 0 });
      }));

    test('вызывает onMove при клике на правую кнопку', (ctx) =>
      context.start(async () => {
        const onMove = vi.fn();
        renderComponent(ctx, { onMove, onKey: vi.fn() });
        await wrap(tick());

        const buttons = document.querySelectorAll(
          `#${testRootId(ctx)} [role="button"]`,
        );
        const rightButton = buttons[1] as HTMLButtonElement;
        fireEvent.click(rightButton);

        expect(onMove).toHaveBeenCalledTimes(1);
        expect(onMove).toHaveBeenCalledWith({ left: 1, top: 0 });
      }));

    test('вызывает onKey при нажатии клавиш стрелок', (ctx) =>
      context.start(async () => {
        const onKey = vi.fn();
        renderComponent(ctx, { onMove: vi.fn(), onKey });
        await wrap(tick());

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(slider, { keyCode: 39 }); // ArrowRight

        expect(onKey).toHaveBeenCalledTimes(1);
        expect(onKey).toHaveBeenCalledWith({ left: 0.05, top: 0 });
      }));

    test('вызывает onKey при нажатии стрелки вниз', (ctx) =>
      context.start(async () => {
        const onKey = vi.fn();
        renderComponent(ctx, { onMove: vi.fn(), onKey });
        await wrap(tick());

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.keyDown(slider, { keyCode: 40 }); // ArrowDown

        expect(onKey).toHaveBeenCalledTimes(1);
        expect(onKey).toHaveBeenCalledWith({ left: 0, top: 0.05 });
      }));

    test('вызывает onMove при mousedown и mousemove', (ctx) =>
      context.start(async () => {
        const onMove = vi.fn();
        renderComponent(ctx, { onMove, onKey: vi.fn() });
        await wrap(tick());

        const sliders = document.querySelectorAll(
          `#${testRootId(ctx)} [role="slider"]`,
        );
        const slider = sliders[0] as HTMLInputElement;
        fireEvent.mouseDown(slider, { clientX: 50, clientY: 50 });
        fireEvent.mouseMove(slider, { clientX: 100, clientY: 100 });

        // onMove должен вызываться хотя бы один раз
        expect(onMove).toHaveBeenCalled();
      }));
  });
});

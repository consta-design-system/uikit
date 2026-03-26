import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { SliderLineProps } from '../helper';
import { SliderLine } from '../SliderLine/SliderLine';

createRoot();
clearStack();

const testId = 'SliderLine';

const defaultLines: SliderLineProps['lines'] = [
  { width: 50, active: true },
  { width: 50, active: false },
];

const renderComponent = (
  ctx: TestContext,
  props: Partial<SliderLineProps> = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SliderLine data-testid={testId} lines={defaultLines} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

const getLines = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll('.SliderLine-Line') ?? [];

const getActiveLine = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    '.SliderLine-Line_active',
  ) as HTMLElement | null;

const getInactiveLine = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    '.SliderLine-Line:not(.SliderLine-Line_active)',
  ) as HTMLElement | null;

describe.concurrent('Компонент SliderLine', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  test('рендерит правильное количество сегментов линии', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);
      expect(getLines(ctx).length).toBe(defaultLines.length);
    }));

  test('устанавливает правильную ширину для сегментов', (ctx) =>
    context.start(async () => {
      renderComponent(ctx);
      const lines = getLines(ctx);
      lines.forEach((line, index) => {
        expect(line).toHaveStyle(
          `--slider-line-size: ${defaultLines[index].width}%`,
        );
      });
    }));

  describe.concurrent('проверка props', () => {
    test('применяет класс для view="division"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { view: 'division' });
        expect(getRender(ctx)).toHaveClass('SliderLine_view_division');
      }));

    test('применяет класс active для активного сегмента', (ctx) =>
      context.start(async () => {
        renderComponent(ctx);
        expect(getActiveLine(ctx)).toBeTruthy();
        expect(getInactiveLine(ctx)).toBeTruthy();
      }));

    test('применяет класс hovered для активного сегмента', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { hovered: true });
        expect(getActiveLine(ctx)).toHaveClass('SliderLine-Line_hovered');
        expect(getInactiveLine(ctx)).not.toHaveClass('SliderLine-Line_hovered');
      }));

    test('применяет класс disabled для всех сегментов', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { disabled: true });
        getLines(ctx).forEach((line) => {
          expect(line).toHaveClass('SliderLine-Line_disabled');
        });
      }));
  });

  describe.concurrent('проверка onHover', () => {
    test('вызывает onHover при наведении на активный сегмент', (ctx) =>
      context.start(async () => {
        const onHover = vi.fn();
        renderComponent(ctx, { onHover });
        const activeLine = getActiveLine(ctx);
        if (!activeLine) throw new Error('Active line not found');

        fireEvent.mouseEnter(activeLine);
        expect(onHover).toHaveBeenCalledWith(true);

        fireEvent.mouseLeave(activeLine);
        expect(onHover).toHaveBeenCalledWith(false);
      }));

    test('не вызывает onHover при наведении на неактивный сегмент', (ctx) =>
      context.start(async () => {
        const onHover = vi.fn();
        renderComponent(ctx, { onHover });
        const inactiveLine = getInactiveLine(ctx);
        if (!inactiveLine) throw new Error('Inactive line not found');

        fireEvent.mouseEnter(inactiveLine);
        expect(onHover).not.toHaveBeenCalled();
      }));

    test('не вызывает onHover, если disabled=true', (ctx) =>
      context.start(async () => {
        const onHover = vi.fn();
        renderComponent(ctx, { onHover, disabled: true });
        const activeLine = getActiveLine(ctx);
        if (!activeLine) throw new Error('Active line not found');

        fireEvent.mouseEnter(activeLine);
        expect(onHover).not.toHaveBeenCalled();
      }));
  });
});

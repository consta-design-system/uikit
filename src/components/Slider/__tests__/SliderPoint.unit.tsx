import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { SliderPointProps } from '../helper';
import { SliderPoint } from '../SliderPoint/SliderPoint';

createRoot();
clearStack();

const testId = 'SliderPoint';

const buttonLabel = 0;

const defaultProps: SliderPointProps = {
  value: 50,
  position: 50,
  buttonLabel,
};

const renderComponent = (ctx: TestContext, props: SliderPointProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SliderPoint
            {...props}
            data-testid={testId}
            tooltipContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

const getTooltip = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} .Tooltip`,
  ) as HTMLElement | null;

describe('Компонент SliderPoint', () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, defaultProps)).not.toThrow();
    }));

  describe('проверка props', () => {
    test('применяет disabled', (ctx) =>
      context.start(async () => {
        const onFocus = vi.fn();
        renderComponent(ctx, { ...defaultProps, disabled: true, onFocus });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');

        fireEvent.focus(point);

        expect(point).toHaveClass('SliderPoint_disabled');
        expect(onFocus).not.toHaveBeenCalled();
      }));

    test('применяет hovered', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...defaultProps, hovered: true });
        expect(getRender(ctx)).toHaveClass('SliderPoint_hovered');
      }));

    test('применяет active', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...defaultProps, active: true });
        expect(getRender(ctx)).toHaveClass('SliderPoint_active');
      }));

    test('устанавливает position', (ctx) =>
      context.start(async () => {
        const position = 75;
        renderComponent(ctx, { ...defaultProps, position });
        expect(getRender(ctx)).toHaveStyle(
          `--slider-button-left: ${position}%`,
        );
      }));

    test('устанавливает aria-label', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, defaultProps);
        expect(getRender(ctx)).toHaveAttribute(
          'aria-label',
          `${buttonLabel}-button`,
        );
      }));
  });

  describe("проверка callback'ов", () => {
    test('вызывает onHover при наведении', (ctx) =>
      context.start(async () => {
        const onHover = vi.fn();
        renderComponent(ctx, { ...defaultProps, onHover });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');

        fireEvent.mouseOver(point);
        expect(onHover).toHaveBeenCalledWith(true);

        fireEvent.mouseOut(point);
        expect(onHover).toHaveBeenCalledWith(false);
      }));

    test('вызывает handlePress при mousedown', (ctx) =>
      context.start(async () => {
        const handlePress = vi.fn();
        renderComponent(ctx, { ...defaultProps, handlePress });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');

        fireEvent.mouseDown(point);
        expect(handlePress).toHaveBeenCalledWith(buttonLabel);
      }));

    test('вызывает onKeyPress при keydown', (ctx) =>
      context.start(async () => {
        const onKeyPress = vi.fn();
        renderComponent(ctx, { ...defaultProps, onKeyPress });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');

        fireEvent.keyDown(point, { key: 'ArrowRight' });
        expect(onKeyPress).toHaveBeenCalled();
      }));

    test('вызывает onFocus при focus и blur', (ctx) =>
      context.start(async () => {
        const onFocus = vi.fn();
        renderComponent(ctx, { ...defaultProps, onFocus });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');

        fireEvent.focus(point);
        expect(onFocus).toHaveBeenCalledWith(expect.any(Object), buttonLabel);

        fireEvent.blur(point);
        expect(onFocus).toHaveBeenCalledWith(expect.any(Object), null);
      }));
  });

  describe('проверка Tooltip', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    const popoverPosition: SliderPointProps['popoverPosition'] = {
      x: 50,
      y: 50,
    };

    const showHoverTooltip = (ctx: TestContext) => {
      const point = getRender(ctx);
      if (!point) throw new Error('Point not found');
      fireEvent.mouseOver(point);
      act(() => {
        vi.runAllTimers();
      });
    };

    test('появляется при наведении', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          withTooltip: true,
          popoverPosition,
        });
        showHoverTooltip(ctx);
        expect(getTooltip(ctx)).toBeTruthy();
      }));

    test('появляется при фокусе', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          withTooltip: true,
          popoverPosition,
        });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');
        fireEvent.focus(point);
        act(() => {
          vi.runAllTimers();
        });
        expect(getTooltip(ctx)).toBeTruthy();
      }));

    test('исчезает при потере фокуса', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          withTooltip: true,
          popoverPosition,
        });
        const point = getRender(ctx);
        if (!point) throw new Error('Point not found');

        fireEvent.focus(point);
        act(() => {
          vi.runAllTimers();
        });
        expect(getTooltip(ctx)).toBeTruthy();

        fireEvent.blur(point);
        act(() => {
          vi.runAllTimers();
        });
        expect(getTooltip(ctx)).toBeFalsy();
      }));

    test('использует tooltipFormatter', (ctx) =>
      context.start(async () => {
        const formatter = (value?: number | string) => `${value}%`;
        renderComponent(ctx, {
          ...defaultProps,
          withTooltip: true,
          tooltipFormatter: formatter,
          popoverPosition,
        });
        showHoverTooltip(ctx);
        expect(getTooltip(ctx)?.textContent).toBe(
          formatter(defaultProps.value),
        );
      }));

    test('не показывается если withTooltip=false', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          withTooltip: false,
          popoverPosition,
        });
        showHoverTooltip(ctx);
        expect(getTooltip(ctx)).toBeFalsy();
      }));
  });
});

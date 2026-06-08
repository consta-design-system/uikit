import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { Tooltip } from '../Tooltip';
import { TooltipProps } from '../types';

createRoot();
clearStack();

const testId = 'tooltip';
const targetTestId = 'target';
const tooltipContentTestId = 'popoverContent';

const renderComponent = (
  ctx: TestContext,
  { ...tooltipProps }: TooltipProps,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  const ref = React.createRef<HTMLDivElement>();

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <>
            <div data-testid={targetTestId} ref={ref}>
              target
            </div>
            <Tooltip
              {...tooltipProps}
              anchorRef={ref}
              data-testid={testId}
              container={document.getElementById(testPopoverId(ctx))!}
            >
              <div data-testid={tooltipContentTestId}>tooltipContent</div>
              {tooltipProps.children}
            </Tooltip>
          </>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getTooltipContent = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `*[data-testid="${tooltipContentTestId}"]`,
  ) as HTMLElement | null;

describe('Компонент Tooltip', () => {
  test('рендерится при isOpen=true', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { isOpen: true, children: '' });
      await wrap(tick());

      expect(getRender(ctx)).toBeInTheDocument();
      expect(getTooltipContent(ctx)).toBeInTheDocument();
    }));

  test('не рендерится при isOpen=false', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { isOpen: false, children: '' });
      await wrap(tick());

      expect(getRender(ctx)).toBeNull();
    }));

  test('присваивает ref', (ctx) =>
    context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent(ctx, { isOpen: true, ref, children: '' });
      await wrap(tick());

      expect(ref.current).toBe(getRender(ctx));
    }));

  test('присваивает className', (ctx) =>
    context.start(async () => {
      const className = 'test-classname';
      renderComponent(ctx, { isOpen: true, className, children: '' });
      await wrap(tick());

      expect(getRender(ctx)).toHaveClass(className);
    }));

  describe('проверка isInteractive', () => {
    test('при isInteractive=true можно взаимодействовать с содержимым тултипа', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          isInteractive: true,
          children: (
            <button data-testid="tooltipButton" onClick={onClick} type="button">
              button
            </button>
          ),
        });
        await wrap(tick());

        const button = getRender(ctx)?.querySelector(
          `button[data-testid="tooltipButton"]`,
        ) as HTMLButtonElement;

        await userEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
      }));

    test('при isInteractive=false нельзя взаимодействовать с содержимым тултипа', async (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          isInteractive: false,
          children: (
            <button data-testid="tooltipButton" onClick={onClick} type="button">
              button
            </button>
          ),
        });
        await wrap(tick());

        const button = getRender(ctx)?.querySelector(
          `button[data-testid="tooltipButton"]`,
        ) as HTMLButtonElement;

        await expect(userEvent.click(button)).rejects.toThrow();

        expect(onClick).not.toHaveBeenCalled();
      }));
  });
});

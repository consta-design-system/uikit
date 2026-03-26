import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { Popover, PopoverProps } from '../Popover';

createRoot();
clearStack();

const testId = 'popover';
const targetTestId = 'target';
const popoverContentTestId = 'popoverContent';

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;
const getPopoverContent = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)}  [data-testid="${popoverContentTestId}"]`,
  );
const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`)!;

type TestProps = PopoverProps & { isOpen: boolean };

const renderComponent = (
  ctx: TestContext,
  { isOpen, children, ...popoverProps }: TestProps,
) => {
  const ref = React.createRef<HTMLDivElement>();
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <>
            <div data-testid={targetTestId} ref={ref}>
              target
            </div>
            {isOpen && (
              <Popover
                {...popoverProps}
                anchorRef={ref}
                data-testid={testId}
                container={document.getElementById(testPopoverId(ctx))!}
              >
                <div data-testid={popoverContentTestId}>popoverContent</div>
                {children as React.ReactNode}
              </Popover>
            )}
          </>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

describe.concurrent('Компонент Popover', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { isOpen: true });
      expect(getRender(ctx)).toBeInTheDocument();
      expect(getPopoverContent(ctx)).toBeInTheDocument();
    }));

  test('вызывает onClickOutside при клике за пределами компонента', (ctx) =>
    context.start(async () => {
      const onClickOutside = vi.fn();
      renderComponent(ctx, { isOpen: true, onClickOutside });

      const outside = getOutside(ctx);
      fireEvent.mouseDown(outside);

      expect(onClickOutside).toHaveBeenCalledWith(expect.any(MouseEvent));
    }));

  test('присваивает className', (ctx) =>
    context.start(async () => {
      const className = 'test-classname';
      renderComponent(ctx, { isOpen: true, className });
      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('присваивает ref', (ctx) =>
    context.start(async () => {
      const ref = React.createRef<HTMLDivElement>();
      renderComponent(ctx, { isOpen: true, ref });
      expect(ref.current).toBe(getRender(ctx));
    }));

  describe.concurrent('проверка isInteractive', () => {
    test('при isInteractive=true можно взаимодействовать с содержимым поповера', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          isInteractive: true,
          children: (
            <button data-testid="popoverButton" onClick={onClick} type="button">
              button
            </button>
          ),
        });

        const button = document.querySelector(
          `#${testPopoverId(ctx)} [data-testid="popoverButton"]`,
        )!;
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
      }));

    test('при isInteractive=false нельзя взаимодействовать с содержимым поповера', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent(ctx, {
          isOpen: true,
          isInteractive: false,
          children: (
            <button data-testid="popoverButton" onClick={onClick} type="button">
              button
            </button>
          ),
        });

        const button = document.querySelector(
          `#${testPopoverId(ctx)} [data-testid="popoverButton"]`,
        )!;

        expect(userEvent.click(button)).rejects.toThrow();

        expect(onClick).not.toHaveBeenCalled();
      }));
  });
});

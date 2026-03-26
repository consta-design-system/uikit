import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { Modal } from '..';

createRoot();
clearStack();

type TModalProps = React.ComponentProps<typeof Modal>;

const testId = 'modal';
const testChildrenId = 'modalChildren';
const overlayAriaLabel = 'Overlay';

const renderComponent = (ctx: TestContext, props: TModalProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Modal
          data-testid={testId}
          isOpen
          container={document.getElementById(testPopoverId(ctx))!}
          {...props}
        >
          <h1 data-testid={testChildrenId}>test</h1>
        </Modal>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

const getChildren = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [data-testid="${testChildrenId}"]`,
  ) as HTMLElement | null;

const getOverlay = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [aria-label="${overlayAriaLabel}"]`,
  ) as HTMLElement;

const getContainer = (ctx: TestContext) =>
  document.getElementById(testPopoverId(ctx))!;

describe.concurrent('Компонент Modal', () => {
  const onClose = vi.fn();

  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { onClose });
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка children', () => {
      test('отображается прокинутый компонент', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onClose });

          expect(getChildren(ctx)).toBeInTheDocument();
        }));
    });

    describe.concurrent('проверка className', () => {
      test('присваивается дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'className';
          renderComponent(ctx, { onClose, className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка обработчиков событий нажатий клавиш', () => {
      test('onEsc: отрабатывает после нажатия на esc', (ctx) =>
        context.start(async () => {
          const onEsc = vi.fn(() => true);
          renderComponent(ctx, { isOpen: true, onEsc });

          fireEvent.keyUp(getContainer(ctx), {
            key: 'Escape',
            code: 'Escape',
          });

          expect(onEsc).toHaveBeenCalled();
          expect(onEsc).toHaveReturned();
        }));
    });
  });

  describe.concurrent('проверка оверлея', () => {
    const onClickOutside = vi.fn();

    test('должен рендериться по дефолту', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { onClose });

        expect(getOverlay(ctx)).toBeInTheDocument();
      }));

    test('должен вызваться onClickOutside по клику на оверлей', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { hasOverlay: true, onClickOutside });

        fireEvent.mouseDown(getOverlay(ctx));
        expect(onClickOutside).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent("проверка callback'ов", () => {
    test('onOpen должен вызваться после рендера', (ctx) =>
      context.start(async () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        renderComponent(ctx, { onClose, onOpen });

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(0);
      }));

    test('onClose должен вызваться в момент закрытия', (ctx) =>
      context.start(async () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        renderComponent(ctx, { onClose, onOpen });

        const root = ReactDOM.createRoot(
          document.getElementById(testRootId(ctx))!,
        );

        act(() => {
          root.render(
            <reatomContext.Provider value={top()}>
              <Modal
                data-testid={testId}
                isOpen={false}
                onClose={onClose}
                onOpen={onOpen}
                container={document.getElementById(testPopoverId(ctx))!}
              >
                <h1 data-testid={testChildrenId}>test</h1>
              </Modal>
            </reatomContext.Provider>,
          );
        });

        expect(onClose).toHaveBeenCalledTimes(1);
      }));

    test('afterClose должен вызваться после закрытия', (ctx) =>
      context.start(async () => {
        vi.useFakeTimers();
        const afterClose = vi.fn();

        const root = ReactDOM.createRoot(
          document.getElementById(testRootId(ctx))!,
        );

        act(() => {
          root.render(
            <reatomContext.Provider value={top()}>
              <Modal
                data-testid={testId}
                isOpen
                afterClose={afterClose}
                container={document.getElementById(testPopoverId(ctx))!}
              >
                <h1 data-testid={testChildrenId}>test</h1>
              </Modal>
            </reatomContext.Provider>,
          );
        });

        act(() => {
          root.render(
            <reatomContext.Provider value={top()}>
              <Modal
                data-testid={testId}
                isOpen={false}
                afterClose={afterClose}
                container={document.getElementById(testPopoverId(ctx))!}
              >
                <h1 data-testid={testChildrenId}>test</h1>
              </Modal>
            </reatomContext.Provider>,
          );
        });

        act(() => {
          vi.runAllTimers();
        });

        expect(afterClose).toHaveBeenCalledTimes(1);

        vi.useRealTimers();
      }));
  });
});

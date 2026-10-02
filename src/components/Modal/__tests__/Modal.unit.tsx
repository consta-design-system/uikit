import { clearStack, context, reatomBoolean, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { factoryComponent } from '##/utils/state';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { Modal, ModalProps } from '..';

createRoot();
clearStack();

const testId = 'modal';
const modalCloseButtonId = `${testId}CloseButton`;
const testChildrenId = 'modalChildren';
const overlayAriaLabel = 'Overlay';

const ModalTest = factoryComponent<
  HTMLDivElement,
  ModalProps & { ctx: TestContext }
>(() => {
  const isOpen = reatomBoolean();
  return ({ ctx, ...props }) => (
    <>
      <button
        data-testid={modalCloseButtonId}
        type="button"
        onClick={isOpen.toggle}
      >
        Close
      </button>
      <Modal
        {...props}
        data-testid={testId}
        container={document.getElementById(testPopoverId(ctx))!}
        isOpen={isOpen()}
      >
        <h1 data-testid={testChildrenId}>test</h1>
      </Modal>
    </>
  );
}, 'ModalTest');

const renderComponent = (ctx: TestContext, props: ModalProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ModalTest {...props} ctx={ctx} />
        </Theme>
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

const getCloseButton = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${modalCloseButtonId}"]`,
  ) as HTMLElement;

const getContainer = (ctx: TestContext) =>
  document.getElementById(testPopoverId(ctx))!;

describe('Компонент Modal', () => {
  const onClose = vi.fn();

  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { onClose });
    }));

  describe('проверка props', () => {
    describe('проверка children', () => {
      test('отображается прокинутый компонент', (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { onClose });

          expect(getChildren(ctx)).toBeInTheDocument();
        }));
    });

    describe('проверка className', () => {
      test('присваивается дополнительный класс', (ctx) =>
        context.start(async () => {
          const className = 'className';
          renderComponent(ctx, { onClose, className });

          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe('проверка обработчиков событий нажатий клавиш', () => {
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

  describe('проверка оверлея', () => {
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

  describe("проверка callback'ов", () => {
    test('onOpen должен вызваться после рендера', (ctx) =>
      context.start(async () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        renderComponent(ctx, { onClose, onOpen });

        await wrap(tick());

        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(0);
      }));

    test('onClose должен вызваться в момент закрытия', (ctx) =>
      context.start(async () => {
        const onOpen = vi.fn();
        const onClose = vi.fn();

        renderComponent(ctx, { onClose, onOpen });

        getCloseButton(ctx).click();

        await wrap(tick());

        expect(onClose).toHaveBeenCalledTimes(1);
      }));
  });
});

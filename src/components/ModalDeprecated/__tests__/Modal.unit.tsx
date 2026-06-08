import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { cnModal, Modal } from '..';

createRoot();
clearStack();

type TModalProps = React.ComponentProps<typeof Modal>;

const testId = 'ModalDeprecated';
const testChildrenId = 'modalChildren';
const overlayAriaLabel = 'Overlay';

const renderComponent = (ctx: TestContext, props: TModalProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Modal
            data-testid={testId}
            isOpen
            {...props}
            container={document.getElementById(testPopoverId(ctx))!}
          >
            <h1 data-testid={testChildrenId}>test</h1>
          </Modal>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testPopoverId(ctx)} [data-testid="${testId}"]`);

const getChildren = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [data-testid="${testChildrenId}"]`,
  );

const getOverlay = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [aria-label="${overlayAriaLabel}"]`,
  )!;

describe(`Компонент ${cnModal}`, () => {
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
          const container = document.getElementById(testRootId(ctx))!;
          fireEvent.keyUp(container, { key: 'Escape', code: 'Escape' });
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
});

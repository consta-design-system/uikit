import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { cnNotificationHeader, NotificationHeader } from '..';

createRoot();
clearStack();

type NotificationHeaderProps = React.ComponentProps<typeof NotificationHeader>;

const testId = 'NotificationHeader';

const renderComponent = (
  ctx: TestContext,
  { ...props }: NotificationHeaderProps,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <NotificationHeader
          {...props}
          data-testid={testId}
          dropdownContainer={document.getElementById(testPopoverId(ctx))!}
        />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
const getTitle = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationHeader('Title')}`);
const getCloseButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnNotificationHeader('CloseButton')}`,
  ) as HTMLElement;
const getActionButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnNotificationHeader('Action')}`,
  ) as HTMLButtonElement;
const getContextMenu = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLElement;
const getContextMenuItems = (ctx: TestContext) =>
  getContextMenu(ctx)?.querySelectorAll(`.ListItem`);

describe('Компонент NotificationHeader', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent(ctx, { className });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает style', (ctx) =>
      context.start(async () => {
        const style = { color: 'red' };
        renderComponent(ctx, { style });

        expect(getRender(ctx)).toHaveStyle(style);
      }));

    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { ref });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('рендерит title', (ctx) =>
      context.start(async () => {
        const title = 'Test Title';
        renderComponent(ctx, { title });

        expect(getTitle(ctx)).toBeInTheDocument();
        expect(getTitle(ctx)).toHaveTextContent(title);
      }));

    test('рендерит кнопку закрытия при наличии onClose', (ctx) =>
      context.start(async () => {
        const onClose = vi.fn();
        renderComponent(ctx, { onClose });

        expect(getCloseButton(ctx)).toBeInTheDocument();
      }));

    test('не рендерит кнопку закрытия при отсутствии onClose', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});

        expect(getCloseButton(ctx)).not.toBeInTheDocument();
      }));

    test('рендерит actions при их наличии', (ctx) =>
      context.start(async () => {
        const actions = [
          { label: 'Action 1', onClick: vi.fn() },
          { label: 'Action 2', onClick: vi.fn() },
        ];
        renderComponent(ctx, { actions });

        fireEvent.click(getActionButton(ctx));

        await wrap(sleep(animateTimeout));
        await wrap(tick());

        expect(getContextMenuItems(ctx)).toHaveLength(actions.length);
      }));

    test('рендерит иконку в кнопке закрытия', (ctx) =>
      context.start(async () => {
        const onClose = vi.fn();
        renderComponent(ctx, { onClose });

        expect(
          getCloseButton(ctx)?.querySelector('.IconClose'),
        ).toBeInTheDocument();
      }));
  });

  describe('проверка взаимодействия', () => {
    test('вызывает onClose при клике на кнопку закрытия', (ctx) =>
      context.start(async () => {
        const onClose = vi.fn();
        renderComponent(ctx, { onClose });

        getCloseButton(ctx)?.click();

        expect(onClose).toHaveBeenCalledTimes(1);
      }));

    test('вызывает onClick при клике на action кнопку', (ctx) =>
      context.start(async () => {
        const actionClick = vi.fn();
        const actions = [{ label: 'Action', onClick: actionClick }];
        renderComponent(ctx, { actions });

        const actionButtons = getActionButton(ctx);
        actionButtons.click();

        expect(actionClick).toHaveBeenCalledTimes(1);
      }));
  });
});

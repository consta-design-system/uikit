import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnNotificationItem, NotificationItem } from '..';
import { items } from '../__mocks__/data.mock';

createRoot();
clearStack();

type NotificationItemProps = React.ComponentProps<typeof NotificationItem>;

const testId = 'NotificationItem';

const renderComponent = ({
  ctx,
  ...props
}: { ctx: TestContext } & NotificationItemProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <NotificationItem {...props} data-testid={testId} />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;
const getTitle = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationItem('Title')}`);
const getAvatar = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationItem('Avatar')}`);
const getCaption = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationItem('Caption')}`);
const getChildren = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationItem('Children')}`);
const getBadge = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationItem('Badge')}`);
const getActions = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnNotificationItem('Actions')}`);

describe.concurrent('Компонент NotificationItem', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent({
          ctx,
        }),
      ).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent({ ctx, className });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает style', (ctx) =>
      context.start(async () => {
        const style = { color: 'red' };
        renderComponent({ ctx, style });

        expect(getRender(ctx)).toHaveStyle(style);
      }));

    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent({ ctx, ref });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('рендерит title', (ctx) =>
      context.start(async () => {
        const title = 'Test Title';
        renderComponent({ ctx, title });

        expect(getTitle(ctx)).toBeInTheDocument();
        expect(getTitle(ctx)).toHaveTextContent(title);
      }));

    test('рендерит content как строку', (ctx) =>
      context.start(async () => {
        const content = 'Test Content';
        renderComponent({ ctx, content });

        expect(getChildren(ctx)).toBeInTheDocument();
        expect(getChildren(ctx)).toHaveTextContent(content);
      }));

    test('рендерит userName и userImageUrl в Avatar', (ctx) =>
      context.start(async () => {
        const userName = 'Test User';
        const userImageUrl = 'test-url';
        renderComponent({ ctx, userName, userImageUrl });

        expect(getAvatar(ctx)).toBeInTheDocument();
        expect(getRender(ctx)).toHaveClass(
          cnNotificationItem({ withAvatar: true }),
        );
      }));

    test('рендерит caption', (ctx) =>
      context.start(async () => {
        const caption = 'Test Caption';
        renderComponent({ ctx, caption });

        expect(getCaption(ctx)).toBeInTheDocument();
        expect(getCaption(ctx)).toHaveTextContent(caption);
      }));

    test('рендерит Badge при read=false', (ctx) =>
      context.start(async () => {
        const title = 'Test Title';
        renderComponent({ ctx, title, read: false });

        expect(getBadge(ctx)).toBeInTheDocument();
      }));

    test('не рендерит Badge при read=true', (ctx) =>
      context.start(async () => {
        const title = 'Test Title';
        renderComponent({ ctx, title, read: true });

        expect(getBadge(ctx)).not.toBeInTheDocument();
      }));

    test('рендерит actions', (ctx) =>
      context.start(async () => {
        const { actions } = items[0];
        renderComponent({ ctx, actions });

        expect(getActions(ctx)).toBeInTheDocument();
      }));

    test('проставляет класс clickable при наличии onClick', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent({ ctx, onClick });

        expect(getRender(ctx)).toHaveClass(
          cnNotificationItem({ clickable: true }),
        );
      }));
  });

  describe.concurrent('проверка взаимодействия', () => {
    test('вызывает onClick при клике', (ctx) =>
      context.start(async () => {
        const onClick = vi.fn();
        renderComponent({ ctx, onClick });

        fireEvent.click(getRender(ctx));

        expect(onClick).toHaveBeenCalledTimes(1);
      }));
  });
});

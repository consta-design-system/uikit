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

import { NotificationGroup } from '..';

createRoot();
clearStack();

const testId = 'NotificationGroup';

const renderComponent = (
  ctx: TestContext,
  { ...props }: React.ComponentProps<typeof NotificationGroup>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <NotificationGroup
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
const getActionButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector('button') as HTMLButtonElement;

const buttonActionClick = (ctx: TestContext) =>
  fireEvent.click(getActionButton(ctx));

describe('Компонент NotificationGroup', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, {
          title: 'test',
        }),
      ).not.toThrow();
    }));

  describe('проверка props', () => {
    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent(ctx, { title: 'test', className });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<HTMLDivElement>();
        renderComponent(ctx, { title: 'test', ref });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('рендерит title', (ctx) =>
      context.start(async () => {
        const title = 'test title';
        renderComponent(ctx, { title });

        expect(getRender(ctx)).toHaveTextContent(title);
      }));

    test('рендерит actions', (ctx) =>
      context.start(async () => {
        const actions = [
          { label: 'action1', onClick: vi.fn() },
          { label: 'action2', onClick: vi.fn() },
        ];

        renderComponent(ctx, { title: 'test', actions });

        buttonActionClick(ctx);
        await wrap(sleep(animateTimeout));
        await wrap(tick());

        expect(
          document.querySelector(`#${testPopoverId(ctx)} *`),
        ).toBeInTheDocument();
      }));

    test('не рендерится если нет title', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});

        expect(getRender(ctx)).toBeNull();
      }));
  });
});

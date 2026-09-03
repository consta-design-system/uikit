import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { NotificationCaption } from '..';

createRoot();
clearStack();

type NotificationCaptionProps = React.ComponentProps<
  typeof NotificationCaption
>;

const testId = 'NotificationCaption';

const renderComponent = ({
  ctx,
  ...props
}: { ctx: TestContext } & NotificationCaptionProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <NotificationCaption data-testid={testId} {...props} />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLElement;

describe('Компонент NotificationCaption', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent({
          ctx,
          children: 'test',
        }),
      ).not.toThrow();
    }));

  describe('проверка props', () => {
    test('прокидывает className', (ctx) =>
      context.start(async () => {
        const className = 'test-class-name';
        renderComponent({ ctx, className, children: 'test' });

        expect(getRender(ctx)).toHaveClass(className);
      }));

    test('прокидывает style', (ctx) =>
      context.start(async () => {
        const style = { color: 'red' };
        renderComponent({ ctx, style, children: 'test' });

        expect(getRender(ctx)).toHaveStyle(style);
      }));

    test('прокидывает ref', (ctx) =>
      context.start(async () => {
        const ref = { current: null };
        renderComponent({
          ctx,
          ref,
          children: 'test',
        });

        expect(ref.current).not.toBeNull();
        expect(ref.current).toBe(getRender(ctx));
      }));

    test('рендерит children', (ctx) =>
      context.start(async () => {
        const children = 'test children';
        renderComponent({ ctx, children });

        expect(getRender(ctx)).toHaveTextContent(children);
      }));
  });
});

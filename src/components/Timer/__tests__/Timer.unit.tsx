import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnTimer, Timer } from '../Timer';

createRoot();
clearStack();

type TimerProps = React.ComponentProps<typeof Timer>;

const testId = cnTimer();

const renderComponent = (ctx: TestContext, props: TimerProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Timer data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid=${testId}]`,
  ) as HTMLElement;

describe.concurrent(`${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка className', () => {
      const className = 'className';

      test(`присваивает className`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { className });
          expect(getRender(ctx)).toHaveClass(className);
        }));
    });

    describe.concurrent('проверка seconds', () => {
      const seconds = 5;

      test(`секунды отображаются`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { seconds });
          expect(getRender(ctx)).toHaveTextContent(seconds.toString());
        }));

      test(`секунды не отображаются если size != m`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { seconds, size: 's' });
          expect(getRender(ctx)).toHaveTextContent('');
        }));
    });
  });
});

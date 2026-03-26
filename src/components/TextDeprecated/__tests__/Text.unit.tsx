import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnText, Text } from '../TextDeprecated';

createRoot();
clearStack();

type TagProps = React.ComponentProps<typeof Text>;

const testId = cnText();

const renderComponent = (ctx: TestContext, props: TagProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Text data-testid={testId} {...props} />
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

  test(`проверка className`, (ctx) =>
    context.start(async () => {
      const className = 'className';
      renderComponent(ctx, { className });

      expect(getRender(ctx)).toHaveClass(className);
    }));
});

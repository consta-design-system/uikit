import { act } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnText, Text } from '../Text';

type TagProps = React.ComponentProps<typeof Text>;

const testId = cnText();

createRoot();

const renderComponent = (ctx: TestContext, props: TagProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <Theme preset={presetGpnDefault}>
        <Text data-testid={testId} {...props} />
      </Theme>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;

describe.concurrent('Компонент Текст', () => {
  test('должен рендериться без ошибок', (ctx) => {
    expect(() => renderComponent(ctx, {})).not.toThrow();
  });

  test('присваивает className', (ctx) => {
    const className = 'className';
    renderComponent(ctx, { className });

    const tagBase = getRender(ctx);

    expect(tagBase).toHaveClass(className);
  });
});

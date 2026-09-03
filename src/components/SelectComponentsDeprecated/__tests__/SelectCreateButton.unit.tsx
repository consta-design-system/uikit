import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { SelectCreateButton } from '../SelectCreateButton/SelectCreateButton';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof SelectCreateButton>;

const testId = 'selectCreateButtonTestId';

const defaultProps: Props = {
  active: false,
  hovered: false,
  size: 's',
  indent: 'normal',
};

const renderComponent = (ctx: TestContext, props: Partial<Props> = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectCreateButton
            {...defaultProps}
            {...props}
            data-testid={testId}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

describe('Компонент SelectCreateButton', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    test('должен отображаться labelForCreate', (ctx) =>
      context.start(async () => {
        const labelForCreate = 'Test label';
        renderComponent(ctx, { labelForCreate });
        expect(getRender(ctx)).toHaveTextContent(labelForCreate);
      }));

    test('должен отображаться inputValue', (ctx) =>
      context.start(async () => {
        const inputValue = 'Test value';
        renderComponent(ctx, { inputValue });
        expect(getRender(ctx)).toHaveTextContent(inputValue);
      }));
  });
});

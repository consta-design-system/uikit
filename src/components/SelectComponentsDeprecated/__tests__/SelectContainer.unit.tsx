import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnSelect } from '../cnSelect';
import {
  SelectContainer,
  SelectContainerProps,
} from '../SelectContainer/SelectContainer';

createRoot();
clearStack();

type Props = Omit<SelectContainerProps, 'children'>;

const defaultProps: Props = {};

const renderComponent = (ctx: TestContext, props: Partial<Props> = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectContainer {...defaultProps} {...props}>
            <div data-testid="content" />
          </SelectContainer>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} .${cnSelect('SelectContainer')}`,
  ) as HTMLElement | null;

describe.concurrent('Компонент Container', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  test('добавляется фокус', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { focused: true });
      expect(getRender(ctx)).toHaveClass(
        cnSelect('SelectContainer', { focused: true }),
      );
    }));

  test('добавляется класс disabled', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { disabled: true });
      expect(getRender(ctx)).toHaveClass(
        cnSelect('SelectContainer', { disabled: true }),
      );
    }));
});

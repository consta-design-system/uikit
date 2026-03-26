import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { cnSelect } from '##/components/SelectComponents/cnSelect';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import {
  SelectContainer,
  SelectContainerProps,
} from '../SelectContainer/SelectContainer';

createRoot();
clearStack();

const testId = 'selectContainer';

const renderComponent = (
  ctx: TestContext,
  props: Omit<SelectContainerProps, 'children'>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectContainer {...props} data-testid={testId}>
            <div data-testid="content" />
          </SelectContainer>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement | null;

const getSelectContainer = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnSelect('SelectContainer')}`,
  ) as Element | null;

describe.concurrent('Компонент Container', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  test('добавляется фокус', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { focused: true });
      expect(getSelectContainer(ctx)).toHaveClass(
        cnSelect('SelectContainer', { focused: true }),
      );
    }));

  test('добавляется класс disabled', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { disabled: true });
      expect(getSelectContainer(ctx)).toHaveClass(
        cnSelect('SelectContainer', { disabled: true }),
      );
    }));
});

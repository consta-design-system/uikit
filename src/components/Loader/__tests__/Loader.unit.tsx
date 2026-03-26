import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId } from '##/utils/vitest';

import { cnLoader, Loader } from '../Loader';

createRoot();
clearStack();

type FileProps = React.ComponentProps<typeof Loader>;

const testId = cnLoader();

const renderComponent = (ctx: TestContext, props: FileProps = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Loader data-testid={testId} {...props} />
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
    describe.concurrent('проверка size', () => {
      (['xs', 's', 'm'] as const).forEach((size) => {
        test(`присваивает класс для size=${size}`, (ctx) =>
          context.start(async () => {
            renderComponent(ctx, { size });

            expect(getRender(ctx)).toHaveClass(cnLoader({ size }));
          }));
      });
    });
  });
});

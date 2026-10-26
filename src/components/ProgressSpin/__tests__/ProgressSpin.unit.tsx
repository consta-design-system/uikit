import { clearStack, context, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnProgressSpin, ProgressSpin } from '../ProgressSpin';

createRoot();
clearStack();

type ProgressSpinProps = React.ComponentProps<typeof ProgressSpin>;

const testId = cnProgressSpin();

const renderComponent = (ctx: TestContext, props: ProgressSpinProps) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <ProgressSpin {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as SVGElement;

describe('Компонент ProgressSpin', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    }));

  describe('проверка props', () => {
    test('дополнительный класс присваивается', (ctx) =>
      context.start(async () => {
        const className = 'className';
        renderComponent(ctx, { className });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(className);
      }));

    test(`при loadingProgress=undefined ProgressSpin должен крутится`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {});
        await wrap(tick());

        expect(getRender(ctx)).toHaveClass(cnProgressSpin({ spin: true }));
      }));

    test(`при указанном loadingProgress ProgressSpin не должен крутится`, (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { value: 1 });
        await wrap(tick());

        expect(getRender(ctx)).not.toHaveClass(cnProgressSpin({ spin: true }));
      }));

    test('ref должен быть присвоен', (ctx) =>
      context.start(async () => {
        const ref = React.createRef<SVGSVGElement>();
        renderComponent(ctx, { ref });
        await wrap(tick());
        expect(ref.current).toBe(getRender(ctx));
      }));
  });
});

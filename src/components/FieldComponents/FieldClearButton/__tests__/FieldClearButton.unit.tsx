import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { FieldClearButton } from '..';

createRoot();
clearStack();

type FieldClearButtonProps = React.ComponentProps<typeof FieldClearButton>;

const testId = 'FieldClearButton';

const renderComponent = (
  ctx: TestContext,
  props: FieldClearButtonProps = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldClearButton data-testid={testId} {...props} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка ref', () => {
    test(`ref присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLButtonElement | null } = { current: null };

        renderComponent(ctx, {
          ref: (el) => setRef(ref, el),
        });

        await tick();

        expect(ref.current).toBeTruthy();
      });
    });
  });

  describe('проверка className', () => {
    test(`Присваивается дополнительный className`, async (ctx) => {
      await context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className });

        await tick();

        expect(getRender(ctx)).toHaveClass(className);
      });
    });
  });

  describe('проверка other props', () => {
    const props = ['data-attr', 'role', 'id'] as const;

    props.forEach((prop) => {
      test(`присваивается  ${prop}=${prop}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { [prop]: prop });

          await tick();

          expect(getRender(ctx)).toHaveAttribute(prop, prop);
        });
      });
    });
  });

  describe('проверка IconClear', () => {
    test('Иконка рендерится', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getRender(ctx).querySelector('svg')).toBeInTheDocument();
      });
    });
  });
});

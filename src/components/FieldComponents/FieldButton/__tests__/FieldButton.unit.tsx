import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { cnMixHitSlop } from '##/mixs/MixHitSlop';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnFieldButtonStyleReset } from '../../FieldButtonStyleReset';
import { FieldButton } from '..';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof FieldButton>;

const testId = 'FieldButton';

const renderComponent = (
  ctx: TestContext,
  {
    children = undefined,
    ...props
  }: Omit<Props, 'children'> & {
    children?: React.ReactNode;
  } = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldButton {...props} data-testid={testId}>
            {children}
          </FieldButton>
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLButtonElement;

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

        renderComponent(ctx, { className, children: undefined });

        await tick();

        expect(getRender(ctx)).toHaveClass(className);
      });
    });
  });

  describe('проверка children', () => {
    test(`Пробрасывается children`, async (ctx) => {
      await context.start(async () => {
        const children = 'children';

        renderComponent(ctx, { children });

        await tick();

        expect(getRender(ctx)).toHaveTextContent(children);
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

  describe('проверка type', () => {
    test('Кнопка имеет type="button"', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getRender(ctx)).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('проверка cnFieldButtonStyleReset и cnMixHitSlop', () => {
    test('cnFieldButtonStyleReset применяется', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getRender(ctx).className).toContain(cnFieldButtonStyleReset());
      });
    });

    test('cnMixHitSlop применяется с mode="reverseMargin"', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        expect(getRender(ctx).className).toContain(
          cnMixHitSlop({ mode: 'reverseMargin' }),
        );
      });
    });
  });
});

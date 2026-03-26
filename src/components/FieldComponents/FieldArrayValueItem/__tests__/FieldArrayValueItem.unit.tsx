import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { cnTagBase } from '##/components/TagBase';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnFieldArrayValueItem, FieldArrayValueItem } from '..';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof FieldArrayValueItem>;

export type PropsWithDefault<Object extends {}, Key extends keyof Object> = {
  [Property in Key]?: Object[Property];
};

const testId = 'FieldArrayValueItem';

const renderComponent = (
  ctx: TestContext,
  {
    label = 'Item',
    size = 'm',
    ...props
  }: PropsWithDefault<Props, keyof Props> = {},
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldArrayValueItem
            {...props}
            label={label}
            data-testid={testId}
            size={size}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
const getRemoveButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnTagBase('CancelButton')}`,
  ) as HTMLButtonElement;

describe.concurrent(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe.concurrent('проверка ref', () => {
    test(`ref присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLSpanElement | null } = { current: null };

        renderComponent(ctx, {
          ref: (el) => setRef(ref, el),
        });

        await tick();

        expect(ref.current).toBeTruthy();
      });
    });
  });

  describe.concurrent('проверка props', () => {
    describe.concurrent('проверка className', () => {
      test(`Присваивается дополнительный className`, async (ctx) => {
        await context.start(async () => {
          const className = 'className';

          renderComponent(ctx, { className });

          await tick();

          expect(getRender(ctx)).toHaveClass(className);
        });
      });
    });

    describe.concurrent('проверка label', () => {
      test(`Пробрасывается children`, async (ctx) => {
        await context.start(async () => {
          const label = 'label';

          renderComponent(ctx, { label });

          await tick();

          expect(getRender(ctx)).toHaveTextContent(label);
        });
      });
    });

    describe.concurrent('проверка size', () => {
      const sizes = ['s', 'm', 'l', 'xs'] as const;
      sizes.forEach((size) => {
        test(`Должен рендериться как <${cnTagBase({
          size,
        })}>`, async (ctx) => {
          await context.start(async () => {
            renderComponent(ctx, { size });

            await tick();

            const component = document
              .getElementById(testRootId(ctx))
              ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

            expect(component).toHaveClass(cnTagBase({ size }));
          });
        });
      });
    });

    describe.concurrent('проверка disabled', () => {
      test(`Должен рендериться как <${cnFieldArrayValueItem({
        disabled: true,
      })}>`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { disabled: true });

          await tick();

          expect(getRender(ctx)).toHaveClass(
            cnFieldArrayValueItem({
              disabled: true,
            }),
          );
        });
      });
    });

    describe.concurrent('проверка onRemove', () => {
      test(`отрабатывает onRemove`, async (ctx) => {
        await context.start(async () => {
          const handleClick = vi.fn();

          renderComponent(ctx, { onRemove: handleClick });

          await tick();

          const button = getRemoveButton(ctx);

          fireEvent.click(button);

          expect(handleClick).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe.concurrent('проверка other props', () => {
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
  });
});

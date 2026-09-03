import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import { setRef } from '##/utils/setRef';
import { createRoot, TestContext, testRootId, tick } from '##/utils/vitest';

import { cnFieldCounter, FieldCounter } from '..';

createRoot();
clearStack();

type Props = React.ComponentProps<typeof FieldCounter>;

const testId = 'FieldCounter';

const renderComponent = (ctx: TestContext, props: Props = {}) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <FieldCounter {...props} data-testid={testId} />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;

const getIncrementButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnFieldCounter('Button', { counter: 'increment' }).split(' ')[1]}`,
  ) as HTMLButtonElement;

const getDecrementButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnFieldCounter('Button', { counter: 'decrement' }).split(' ')[1]}`,
  ) as HTMLButtonElement;

describe(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, {})).not.toThrow();
    });
  });

  describe('проверка ref', () => {
    test(`ref присвоен`, async (ctx) => {
      await context.start(async () => {
        const ref: { current: HTMLDivElement | null } = { current: null };

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

  describe('проверка onIncrementClick', () => {
    test(`onIncrementClick отрабатывает`, async (ctx) => {
      await context.start(async () => {
        const onIncrementClick = vi.fn();

        renderComponent(ctx, { onIncrementClick });

        await tick();

        fireEvent.click(getIncrementButton(ctx));

        expect(onIncrementClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('проверка onDecrementClick', () => {
    test(`onDecrementClick отрабатывает`, async (ctx) => {
      await context.start(async () => {
        const onDecrementClick = vi.fn();

        renderComponent(ctx, { onDecrementClick });

        await tick();

        fireEvent.click(getDecrementButton(ctx));

        expect(onDecrementClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('проверка onIncrementFocus', () => {
    test(`onIncrementFocus отрабатывает`, async (ctx) => {
      await context.start(async () => {
        const onIncrementFocus = vi.fn();

        renderComponent(ctx, { onIncrementFocus });

        await tick();

        fireEvent.focus(getIncrementButton(ctx));

        expect(onIncrementFocus).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('проверка onDecrementFocus', () => {
    test(`onDecrementFocus отрабатывает`, async (ctx) => {
      await context.start(async () => {
        const onDecrementFocus = vi.fn();

        renderComponent(ctx, { onDecrementFocus });

        await tick();

        fireEvent.focus(getDecrementButton(ctx));

        expect(onDecrementFocus).toHaveBeenCalledTimes(1);
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

  describe('проверка кнопок инкремента и декремента', () => {
    test('Кнопка инкремента имеет корректный className', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        const incrementButton = getIncrementButton(ctx);
        expect(incrementButton).toHaveClass(
          cnFieldCounter('Button', { counter: 'increment' }).split(' ')[1],
        );
      });
    });

    test('Кнопка декремента имеет корректный className', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        const decrementButton = getDecrementButton(ctx);
        expect(decrementButton).toHaveClass(
          cnFieldCounter('Button', { counter: 'decrement' }).split(' ')[1],
        );
      });
    });

    test('Кнопка инкремента имеет корректный tabIndex', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        const incrementButton = getIncrementButton(ctx);
        expect(incrementButton).toHaveAttribute('tabIndex', '-1');
      });
    });

    test('Кнопка декремента имеет корректный tabIndex', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        const decrementButton = getDecrementButton(ctx);
        expect(decrementButton).toHaveAttribute('tabIndex', '-1');
      });
    });
  });

  describe('проверка иконок', () => {
    test('Иконка инкремента рендерится', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        const incrementButton = getIncrementButton(ctx);
        expect(incrementButton?.querySelector('svg')).toBeTruthy();
      });
    });

    test('Иконка декремента рендерится', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        await tick();

        const decrementButton = getDecrementButton(ctx);
        expect(decrementButton?.querySelector('svg')).toBeTruthy();
      });
    });
  });
});

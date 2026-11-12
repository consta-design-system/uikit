import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { cnListItem } from '../../ListCanary';
import { exampleThemesThree, exampleThemesTwo } from '../__mocks__/data.mock';
import { ThemeToggler } from '../ThemeToggler';
import { ThemeTogglerProps } from '../types';

type Item = (typeof exampleThemesTwo)[number];

const defaultSetValue = vi.fn();
const testId = 'ThemeToggler';

createRoot();
clearStack();

const renderComponent = (
  ctx: TestContext,
  props: Partial<ThemeTogglerProps<Item>>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <ThemeToggler
          {...props}
          getItemKey={(item) => item.label}
          data-testid={testId}
          className={props.className}
          items={props.items || exampleThemesThree}
          value={
            props.value ||
            (props.items && props.items[0]) ||
            exampleThemesTwo[0]
          }
          onChange={props.onChange || defaultSetValue}
          dropdownContainer={document.getElementById(testPopoverId(ctx))!}
        />
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))!
    .querySelector(`[data-testid="${testId}"]`);

const toggleClick = (ctx: TestContext) => {
  fireEvent.click(getRender(ctx)!);
};

const getItems = (ctx: TestContext) =>
  document
    .getElementById(testPopoverId(ctx))!
    .querySelectorAll(`.${cnListItem()}`);

const getItem = (ctx: TestContext, index = 0) => getItems(ctx)[index];

describe('Компонент ThemeToggler', () => {
  describe('с двумя темами', () => {
    test('должен рендериться без ошибок', async (ctx) => {
      await context.start(async () => {
        expect(() =>
          renderComponent(ctx, { items: exampleThemesTwo }),
        ).not.toThrow();
      });
    });

    test('срабатывает onChange при клике', async (ctx) => {
      await context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: exampleThemesTwo,
          onChange: handleChange,
        });

        toggleClick(ctx);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('с тремя темами', () => {
    test('должен рендериться без ошибок', async (ctx) => {
      await context.start(async () => {
        expect(() =>
          renderComponent(ctx, { items: exampleThemesThree }),
        ).not.toThrow();
      });
    });

    test('количество items совпадает с передаваемым', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, { items: exampleThemesThree });

        toggleClick(ctx);
        await wrap(sleep(animateTimeout));
        await wrap(tick());

        expect(getItems(ctx).length).toEqual(exampleThemesThree.length);
      });
    });

    test('label совпадает', async (ctx) => {
      await context.start(async () => {
        renderComponent(ctx, {});

        toggleClick(ctx);
        await wrap(sleep(animateTimeout));
        await wrap(tick());

        expect(getItem(ctx).textContent).toEqual(exampleThemesThree[0].label);
      });
    });

    test('срабатывает onChange при выборе темы', async (ctx) => {
      await context.start(async () => {
        const handleChange = vi.fn();
        renderComponent(ctx, {
          items: exampleThemesThree,
          onChange: (value) => handleChange(value),
        });

        toggleClick(ctx);
        await wrap(sleep(animateTimeout));
        await wrap(tick());

        await userEvent.click(getItem(ctx));

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining(exampleThemesThree[0]),
        );
      });
    });
  });

  describe('проверка className', () => {
    test('Присваивается дополнительный className', async (ctx) => {
      await context.start(async () => {
        const className = 'className';

        renderComponent(ctx, { className });
        expect(getRender(ctx)).toHaveClass(className);
      });
    });
  });
});

import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';
import { cnLoader } from '##/components/LoaderDeprecated';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import { setRef } from '##/utils/setRef';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import {
  AutoComplete,
  AutoCompleteProps,
  cnAutoComplete,
} from '../AutoCompleteCanary';
import { AutoCompleteGroupDefault, AutoCompleteItemDefault } from '../types';

createRoot();
clearStack();

const items: AutoCompleteItemDefault[] = [
  { id: 1, label: 'Item 1', groupId: 1 },
  { id: 2, label: 'Item 2', groupId: 1 },
  { id: 3, label: 'Item 3', groupId: 2 },
  { id: 4, label: 'Item 4', groupId: 2 },
];

const groups: AutoCompleteGroupDefault[] = [
  { id: 1, label: 'Group 1' },
  { id: 2, label: 'Group 2' },
];

const testId = 'AutoCompleteCanary';

const renderComponent = <
  TYPE extends string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
>(
  ctx: TestContext,
  props: AutoCompleteProps<TYPE, ITEM, GROUP>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <AutoComplete
            {...props}
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`) as HTMLDivElement;

const getDropdown = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLDivElement;

const getLoader = (ctx: TestContext) =>
  getDropdown(ctx).querySelector(`.${cnLoader()}`) as HTMLDivElement;

const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector(`input[type="text"]`) as HTMLInputElement;

const getItems = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];

const getItem = (ctx: TestContext, index: number = 0) =>
  getItems(ctx)[index] as HTMLDivElement;

const getGroups = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(`.${cnListGroupLabel()}`);

const inputClick = (ctx: TestContext) => fireEvent.click(getInput(ctx));
const outsideClick = (ctx: TestContext) => fireEvent.mouseDown(getOutside(ctx));

const getItemLabel = (item: AutoCompleteItemDefault) => item.label;
const getGroupLabel = (group: AutoCompleteGroupDefault) => group.label;
describe.concurrent(`Компонент ${testId}`, () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      const render = renderComponent(ctx, {
        items,
        getItemLabel,
        value: '',
      });
      await wrap(tick());

      expect(() => render).not.toThrow();
    }));

  describe.concurrent('проверка type', () => {
    test('рендерит AutoCompleteTypeText по умолчанию', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          value: '',
        });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnAutoComplete({ type: 'text' }));
      }));

    test('рендерит AutoCompleteTypeText при type="text"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          type: 'text',
          value: '',
        });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(cnAutoComplete({ type: 'text' }));
      }));

    test('рендерит AutoCompleteTypeTextArray при type="textarray"', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          type: 'textarray',
          value: [],
        });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(
          cnAutoComplete({ type: 'textarray' }),
        );
      }));
  });

  describe.concurrent('проверка ref', () => {
    test('ref присвоен', (ctx) =>
      context.start(async () => {
        const ref = { current: null };

        renderComponent(ctx, {
          items,
          getItemLabel,
          ref: (el: HTMLDivElement | null) => setRef(ref, el),
          value: '',
        });
        await wrap(tick());

        expect(ref.current).toBeTruthy();
      }));
  });

  describe.concurrent('проверка className', () => {
    test('Присваивается дополнительный className', (ctx) =>
      context.start(async () => {
        const className = 'custom-class';
        renderComponent(ctx, {
          items,
          getItemLabel,
          className,
          value: '',
        });
        await wrap(tick());
        expect(getRender(ctx)).toHaveClass(className);
      }));
  });

  describe.concurrent('рендерит элементы items', () => {
    test('рендерит элементы items для типа text', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          type: 'text',
          value: 'item',
        });
        await wrap(tick());

        const input = getInput(ctx);
        fireEvent.focus(input);
        await wrap(tick());
        await wrap(sleep(animateTimeout));

        items.forEach((item) => {
          expect(getDropdown(ctx).textContent).toContain(item.label);
        });
      }));
  });

  describe.concurrent('рендерит группы', () => {
    test('рендерит группы', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          getGroupLabel,
          groups,
          value: 'item',
        });
        await wrap(tick());

        inputClick(ctx);
        await wrap(tick());
        await wrap(sleep(animateTimeout));
        expect(getGroups(ctx).length).toEqual(groups.length);
      }));
  });

  describe.concurrent('открывается по клику', () => {
    test('открывается по клику', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          value: 'item',
        });
        await wrap(tick());

        inputClick(ctx);
        await wrap(tick());
        await wrap(sleep(animateTimeout));

        expect(getDropdown(ctx)).toBeInTheDocument();
      }));
  });

  describe.concurrent('закрывается по клику вне компонента', () => {
    test('закрывается по клику вне компонента', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          value: 'item',
        });
        await wrap(tick());

        inputClick(ctx);
        await wrap(tick());
        await wrap(sleep(animateTimeout));
        expect(getDropdown(ctx)).toBeInTheDocument();

        outsideClick(ctx);
        await wrap(tick());
        await wrap(sleep(animateTimeout));
        expect(getDropdown(ctx)).not.toBeInTheDocument();
      }));
  });

  describe.concurrent('проверка onChange', () => {
    test('проверка onChange', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        renderComponent(ctx, {
          items,
          getItemLabel,
          onChange: onChangeMock,
          value: 'item',
        });
        await wrap(tick());

        const input = getInput(ctx);
        fireEvent.focus(input);
        await wrap(tick());
        await wrap(sleep(animateTimeout));

        fireEvent.click(getItem(ctx, 0));
        expect(onChangeMock).toHaveBeenCalled();
        expect(onChangeMock).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка onFocus', () => {
    test('проверка onFocus', (ctx) =>
      context.start(async () => {
        const handlerFocus = vi.fn();
        renderComponent(ctx, {
          items,
          getItemLabel,
          onFocus: handlerFocus,
          value: '',
        });
        await wrap(tick());

        expect(handlerFocus).toHaveBeenCalledTimes(0);
        getInput(ctx).focus();
        expect(handlerFocus).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка onBlur', () => {
    test('проверка onBlur', (ctx) =>
      context.start(async () => {
        const handlerBlur = vi.fn();
        renderComponent(ctx, {
          items,
          getItemLabel,
          onBlur: handlerBlur,
          value: '',
        });
        await wrap(tick());

        getInput(ctx).focus();
        expect(handlerBlur).toHaveBeenCalledTimes(0);
        getInput(ctx).blur();
        expect(handlerBlur).toHaveBeenCalledTimes(1);
      }));
  });

  describe.concurrent('проверка isLoading', () => {
    test('проверка isLoading при пустом списке', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items: [],
          getItemLabel,
          isLoading: true,
          value: 'item',
        });
        await wrap(tick());

        fireEvent.focus(getInput(ctx));
        await wrap(tick());
        await wrap(sleep(animateTimeout));
        expect(getLoader(ctx)).toBeInTheDocument();
      }));

    test('проверка isLoading со списком', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          items,
          getItemLabel,
          isLoading: true,
          value: 'item',
        });
        await wrap(tick());

        fireEvent.focus(getInput(ctx));
        await wrap(tick());
        await wrap(sleep(animateTimeout));
        expect(getLoader(ctx)).toBeInTheDocument();
      }));
  });
});

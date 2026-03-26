import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { presetGpnDefault, Theme } from '##/components/Theme';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { cn } from '../../../utils/bem';
import { cnListGroupLabel } from '../../ListCanary';
import { cnSelect } from '../../SelectComponentsDeprecated/cnSelect';
import { groups, items } from '../__mocks__/data.mock';
import { DefaultGroup, DefaultItem } from '../helpers';
import {
  defaultGetItemLabel,
  UserSelect,
  UserSelectProps,
} from '../UserSelectDeprecated';
import { cnUserSelectItem } from '../UserSelectItem/UserSelectItem';
import { cnUserSelectValue } from '../UserSelectValue/UserSelectValue';

createRoot();
clearStack();

const testId = 'UserSelect';
const cnRenderValue = cn('RenderValue');
const cnRenderItem = cn('RenderItem');

const defaultProps: UserSelectProps = {
  items,
  value: null,
  onChange: vi.fn(),
  ariaLabel: 'test-combobox',
};

function renderComponent<
  ITEM = DefaultItem,
  GROUP = DefaultGroup,
  MULTIPLE extends boolean = false,
>(ctx: TestContext, props: UserSelectProps<ITEM, GROUP, MULTIPLE>) {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <UserSelect<ITEM, GROUP, MULTIPLE>
            {...props}
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
}

function getRender(ctx: TestContext) {
  return document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;
}

function getOutside(ctx: TestContext) {
  return document.querySelector(`#${testOutsideId(ctx)}`) as HTMLElement;
}

function getItemsList(ctx: TestContext) {
  return document.querySelector(
    `#${testPopoverId(ctx)} [role="listbox"]`,
  ) as HTMLElement;
}

function getUserSelectValue(ctx: TestContext) {
  return getRender(ctx).querySelector(
    `.${cnUserSelectValue()}`,
  ) as HTMLDivElement;
}

function getSelectValues(ctx: TestContext) {
  return getRender(ctx).querySelectorAll(`.${cnUserSelectValue()}`);
}

function getSelectValue(ctx: TestContext, index = 0) {
  return getSelectValues(ctx)[index];
}

function getRenderValue(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnRenderValue()}`) as HTMLDivElement;
}

function getIndicatorsDropdown(ctx: TestContext) {
  return getRender(ctx).querySelector(
    `.${cnSelect('IndicatorsDropdown')}`,
  ) as HTMLElement;
}

function indicatorsDropdownClick(ctx: TestContext) {
  fireEvent.click(getIndicatorsDropdown(ctx));
}

function getInput(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnSelect('Input')}`) as HTMLElement;
}

function getItems(ctx: TestContext) {
  const itemsList = getItemsList(ctx);
  if (!itemsList) return [];
  return itemsList.querySelectorAll(`.${cnUserSelectItem()}`);
}

function getRenderItems(ctx: TestContext) {
  const itemsList = getItemsList(ctx);
  if (!itemsList) return [];
  return itemsList.querySelectorAll(`.${cnRenderItem()}`);
}

function getGroups(ctx: TestContext) {
  const itemsList = getItemsList(ctx);
  if (!itemsList) return [];
  return itemsList.querySelectorAll(`.${cnListGroupLabel()}`);
}

function getItem(ctx: TestContext, index = 0) {
  return getItems(ctx)[index];
}

function inputClick(ctx: TestContext) {
  fireEvent.click(getInput(ctx));
}

function outsideClick(ctx: TestContext) {
  fireEvent.mouseDown(getOutside(ctx));
}

describe.concurrent('Компонент UserSelect', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, defaultProps)).not.toThrow();
    }));

  test(`Присваивается дополнительный className`, (ctx) =>
    context.start(async () => {
      const className = 'className';

      renderComponent(ctx, { ...defaultProps, className });
      await wrap(tick());
      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('рендериться с установленным значением при multiple = false', async (ctx) =>
    context.start(async () => {
      const index = 0;
      const value = items[index];

      renderComponent(ctx, {
        ...defaultProps,
        value,
      });

      await wrap(tick());

      expect(getUserSelectValue(ctx).textContent).toContain(
        defaultGetItemLabel(value),
      );

      getInput(ctx).click();
      await wrap(tick());

      expect(getItem(ctx, index)).toHaveClass(
        cnUserSelectItem({ active: true }),
      );
    }));

  test('рендериться с установленным значением при multiple = true', async (ctx) =>
    context.start(async () => {
      const indexes = [0, 1, 5];
      const value = indexes.map((index) => items[index]);

      renderComponent(ctx, {
        ...defaultProps,
        multiple: true,
        value,
      });

      await wrap(tick());

      expect(getSelectValues(ctx).length).toEqual(value.length);
      expect(getSelectValue(ctx, 0).textContent).toContain(
        defaultGetItemLabel(value[0]),
      );
      expect(getSelectValue(ctx, 1).textContent).toContain(
        defaultGetItemLabel(value[1]),
      );
      expect(getSelectValue(ctx, 2).textContent).toContain(
        defaultGetItemLabel(value[2]),
      );

      inputClick(ctx);
      await wrap(tick());

      expect(getItem(ctx, indexes[0])).toHaveClass(
        cnUserSelectItem({ active: true }),
      );
      expect(getItem(ctx, indexes[1])).toHaveClass(
        cnUserSelectItem({ active: true }),
      );
      expect(getItem(ctx, indexes[2])).toHaveClass(
        cnUserSelectItem({ active: true }),
      );
    }));

  test('открывается и закрывается по клику', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());
      await wrap(sleep(200));

      const optionsList = getItemsList(ctx);

      expect(optionsList).toBeInTheDocument();
      inputClick(ctx);
      await wrap(tick());
      await wrap(sleep(200));

      expect(optionsList).not.toBeInTheDocument();
    }));

  test('открывается и закрывается по клику за пределами селекта', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());
      await wrap(sleep(200));

      const optionsList = getItemsList(ctx);

      expect(optionsList).toBeInTheDocument();
      outsideClick(ctx);
      await wrap(tick());
      await wrap(sleep(200));
      expect(optionsList).not.toBeInTheDocument();
    }));

  test('открывается и закрывается по клику на индикатор', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);

      await wrap(tick());

      indicatorsDropdownClick(ctx);
      await wrap(tick());
      await wrap(sleep(200));

      expect(getItemsList(ctx)).toBeInTheDocument();
      outsideClick(ctx);
      await wrap(tick());
      await wrap(sleep(200));
      expect(getItemsList(ctx)).not.toBeInTheDocument();
    }));

  test('отрисовываются опции', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());

      expect(getItems(ctx).length).toEqual(items.length);
    }));

  test('отрисовываются группы', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { ...defaultProps, groups });

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());
      expect(getGroups(ctx).length).toEqual(groups.length);
    }));

  test('проверка onChange при multiple = false', async (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      const elementIndex = 1;

      renderComponent(ctx, { ...defaultProps, onChange: handleChange });

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: items[elementIndex] }),
      );
    }));

  test('проверка onChange при multiple = true', async (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      const elementIndex = 1;

      renderComponent(ctx, {
        ...defaultProps,
        multiple: true,
        onChange: handleChange,
      });

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          value: [items[elementIndex]],
        }),
      );
    }));

  test('вызывается onFocus', (ctx) =>
    context.start(async () => {
      const handlerFocus = vi.fn();
      renderComponent(ctx, { ...defaultProps, onFocus: handlerFocus });

      await wrap(tick());

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      fireEvent.focus(getInput(ctx));
      //   fireEvent.focus(getInput(ctx));
      await wrap(tick());

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    }));

  test('вызывается onBlur', (ctx) =>
    context.start(async () => {
      const handlerBlur = vi.fn();
      renderComponent(ctx, { ...defaultProps, onBlur: handlerBlur });

      await wrap(tick());

      fireEvent.focus(getInput(ctx));
      await wrap(tick());

      expect(handlerBlur).toHaveBeenCalledTimes(0);

      fireEvent.blur(getInput(ctx));
      await wrap(tick());

      expect(handlerBlur).toHaveBeenCalledTimes(1);
    }));

  test('renderValue отрабатывает верно', (ctx) =>
    context.start(async () => {
      const value = items[0];
      renderComponent(ctx, {
        ...defaultProps,
        value,
        renderValue: ({ item }) => (
          <div className={cnRenderValue()}>{defaultGetItemLabel(item)}</div>
        ),
      });

      await wrap(tick());

      expect(getRenderValue(ctx).textContent).toEqual(
        defaultGetItemLabel(value),
      );
    }));

  test('renderItem отрабатывает верно', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        ...defaultProps,
        renderItem: ({ item }) => (
          <div
            className={cnRenderItem()}
            role="option"
            tabIndex={0}
            aria-selected={false}
            aria-hidden="true"
          >
            {defaultGetItemLabel(item)}
          </div>
        ),
      });

      await wrap(tick());

      inputClick(ctx);
      await wrap(tick());

      expect(getRenderItems(ctx).length).toEqual(items.length);
    }));
});

import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';
import { cnSelect } from '##/components/SelectComponents/cnSelect';
import { cnSelectValueTag } from '##/components/SelectComponents/SelectValueTag/SelectValueTag';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import { cn } from '##/utils/bem';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import { Combobox, ComboboxProps, defaultGetItemLabel } from '..';
import { groups, items } from '../__mocks__/data.mock';
import { ComboboxGroupDefault, ComboboxItemDefault } from '../helpers';

createRoot();
clearStack();

const testId = 'Combobox';
const cnRenderValue = cn('RenderValue');
const cnRenderItem = cn('RenderItem');

const defaultProps: ComboboxProps = {
  items,
  value: null,
  onChange: vi.fn(),
  ariaLabel: 'test-combobox',
};

function renderComponent<
  ITEM = ComboboxItemDefault,
  GROUP = ComboboxGroupDefault,
  MULTIPLE extends boolean = false,
>(ctx: TestContext, props: ComboboxProps<ITEM, GROUP, MULTIPLE>) {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Combobox<ITEM, GROUP, MULTIPLE>
            {...props}
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
}

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} *[data-testid="${testId}"]`,
  ) as HTMLDivElement;

const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`) as HTMLDivElement;

const getItemsList = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [role="listbox"]`,
  ) as HTMLDivElement;

const getControlValue = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnSelect('ControlValue')}`,
  ) as HTMLDivElement;

const getSelectValues = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnSelectValueTag()}`);

const getSelectValue = (ctx: TestContext, index = 0) =>
  getSelectValues(ctx)[index];

const getRenderValue = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnRenderValue()}`) as HTMLDivElement;

const getIndicatorsDropdown = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnSelect('IndicatorsDropdown')}`,
  ) as HTMLElement;

const indicatorsDropdownClick = (ctx: TestContext) => {
  fireEvent.click(getIndicatorsDropdown(ctx));
};

const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('Input')}`) as HTMLElement;

const getItems = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnListItem()}`);

const getRenderItems = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnRenderItem()}`);

const getGroups = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnListGroupLabel()}`);

const getItem = (ctx: TestContext, index = 0) => getItems(ctx)[index];

const inputClick = (ctx: TestContext) => {
  fireEvent.click(getInput(ctx));
};

const outsideClick = (ctx: TestContext) => {
  fireEvent.mouseDown(getOutside(ctx));
};

const getClearButton = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('ClearIndicator')}`) as HTMLElement;

describe('Компонент Combobox', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx, defaultProps)).not.toThrow();
    }));

  test(`Присваивается дополнительный className`, (ctx) =>
    context.start(async () => {
      const className = 'className';

      renderComponent(ctx, { ...defaultProps, className });

      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('рендериться с установленным значением при multiple = false', (ctx) =>
    context.start(async () => {
      const index = 0;
      const value = items[index];
      renderComponent(ctx, {
        ...defaultProps,
        value,
      });

      expect(getControlValue(ctx).textContent).toEqual(
        defaultGetItemLabel(value),
      );

      inputClick(ctx);

      expect(getItem(ctx, index)).toHaveClass(cnListItem({ checked: true }));
    }));

  test('рендериться с установленным значением при multiple = true', (ctx) =>
    context.start(async () => {
      const indexes = [0, 1, 5];
      const value = indexes.map((index) => items[index]);

      renderComponent(ctx, {
        ...defaultProps,
        multiple: true,
        value,
      });

      expect(getSelectValues(ctx).length).toEqual(value.length);
      expect(getSelectValue(ctx, 0).textContent).toEqual(
        defaultGetItemLabel(value[0]),
      );
      expect(getSelectValue(ctx, 1).textContent).toEqual(
        defaultGetItemLabel(value[1]),
      );
      expect(getSelectValue(ctx, 2).textContent).toEqual(
        defaultGetItemLabel(value[2]),
      );

      inputClick(ctx);

      expect(getItem(ctx, indexes[0])).toHaveAttribute('aria-selected', 'true');
      expect(getItem(ctx, indexes[1])).toHaveAttribute('aria-selected', 'true');
      expect(getItem(ctx, indexes[2])).toHaveAttribute('aria-selected', 'true');
    }));

  test('отрисовываются опции', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);

      inputClick(ctx);

      expect(getItems(ctx).length).toEqual(items.length);
    }));

  test('отрисовываются группы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { ...defaultProps, groups });

      inputClick(ctx);

      expect(getGroups(ctx).length).toEqual(groups.length);
    }));

  test('проверка onChange при multiple = false', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      const elementIndex = 1;
      renderComponent(ctx, { ...defaultProps, onChange: handleChange });

      inputClick(ctx);

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(items[elementIndex], {
        e: expect.any(Object),
      });
    }));

  test('проверка onChange при multiple = true', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      const elementIndex = 1;
      renderComponent(ctx, {
        ...defaultProps,
        multiple: true,
        onChange: handleChange,
      });

      inputClick(ctx);

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([items[elementIndex]], {
        e: expect.any(Object),
      });
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

      expect(getRenderValue(ctx).textContent).toEqual(
        defaultGetItemLabel(value),
      );
    }));

  test('renderItem отрабатывает верно', (ctx) =>
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

      inputClick(ctx);

      expect(getRenderItems(ctx).length).toEqual(items.length);
    }));

  test('отображает "Все" в инпут, когда все элементы выбраны', (ctx) =>
    context.start(async () => {
      const allSelectedAllLabel = 'Выбраны все элементы';
      renderComponent(ctx, {
        ...defaultProps,
        multiple: true,
        selectAll: true,
        value: items,
        allSelectedAllLabel,
      });

      const selectAllText = getRender(ctx).querySelector(
        `.${cnSelect('SelectAll')}`,
      );
      expect(selectAllText).toBeInTheDocument();
      expect(selectAllText).toHaveTextContent(allSelectedAllLabel);
    }));

  describe('проверка кнопки очистки', () => {
    test('при клике вызывает onChange с null', (ctx) =>
      context.start(async () => {
        const handleChange = vi.fn();

        renderComponent(ctx, {
          ...defaultProps,
          value: items[0],
          onChange: handleChange,
        });

        const clearButton = getClearButton(ctx);
        fireEvent.click(clearButton);

        expect(handleChange).toHaveBeenCalledWith(null, {
          e: expect.any(Object),
        });
      }));

    test('не отображается, если значение не выбрано', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, defaultProps);

        expect(getClearButton(ctx)).not.toBeInTheDocument();
      }));

    test('отображается, если значение выбрано', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...defaultProps, value: items[0] });

        expect(getClearButton(ctx)).toBeInTheDocument();
      }));

    test('не отображается, если значение не выбрано в multiple', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { ...defaultProps, multiple: true, value: [] });

        expect(getClearButton(ctx)).not.toBeInTheDocument();
      }));

    test('отображается, если значение выбрано в multiple', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, {
          ...defaultProps,
          multiple: true,
          value: [items[0]],
        });

        expect(getClearButton(ctx)).toBeInTheDocument();
      }));
  });

  test('открывается и закрывается по клику', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);
      await wrap(tick());

      inputClick(ctx);

      await wrap(tick());
      await wrap(sleep(animateTimeout));

      const optionsList = getItemsList(ctx);

      expect(optionsList).toBeInTheDocument();
      inputClick(ctx);
      await wrap(tick());
      await wrap(sleep(animateTimeout));

      expect(optionsList).not.toBeInTheDocument();
    }));

  test('открывается и закрывается по клику за пределами селекта', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);
      await wrap(tick());
      inputClick(ctx);
      await wrap(tick());
      await wrap(sleep(animateTimeout));

      const optionsList = getItemsList(ctx);

      expect(optionsList).toBeInTheDocument();
      outsideClick(ctx);
      await wrap(tick());
      await wrap(tick());

      await wrap(sleep(animateTimeout));
      expect(optionsList).not.toBeInTheDocument();
    }));

  test('открывается по клику на индикатор', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, defaultProps);

      indicatorsDropdownClick(ctx);

      expect(getItemsList(ctx)).toBeInTheDocument();
    }));

  test('вызывается onFocus', (ctx) =>
    context.start(async () => {
      const handlerFocus = vi.fn();
      renderComponent(ctx, { ...defaultProps, onFocus: handlerFocus });

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      fireEvent.focus(getInput(ctx));

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    }));

  test('вызывается onBlur', (ctx) =>
    context.start(async () => {
      const handlerBlur = vi.fn();
      renderComponent(ctx, { ...defaultProps, onBlur: handlerBlur });

      getInput(ctx).focus();

      expect(handlerBlur).toHaveBeenCalledTimes(0);

      getInput(ctx).blur();

      expect(handlerBlur).toHaveBeenCalledTimes(1);
    }));
});

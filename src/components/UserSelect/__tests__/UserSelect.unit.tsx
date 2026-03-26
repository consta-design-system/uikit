import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { cnListGroupLabel } from '##/components/ListCanary';
import { cnSelect } from '##/components/SelectComponents/cnSelect';
import { cn } from '##/utils/bem';
import {
  createRoot,
  TestContext,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { groups, items } from '../__mocks__/data.mock';
import { UserSelectGroupDefault, UserSelectItemDefault } from '../helpers';
import {
  defaultGetItemLabel,
  UserSelect,
  UserSelectProps,
} from '../UserSelect';
import { cnUserSelectItem } from '../UserSelectItem/UserSelectItem';
import { cnUserSelectValue } from '../UserSelectValue/UserSelectValue';

const animationDuration = 200;
const testId = 'UserSelect';
const cnRenderValue = cn('RenderValue');
const cnRenderItem = cn('RenderItem');

createRoot();
clearStack();

const defaultProps: UserSelectProps = {
  items,
  value: null,
  onChange: vi.fn(),
  ariaLabel: 'test-combobox',
};

const renderComponent = <
  ITEM = UserSelectItemDefault,
  GROUP = UserSelectGroupDefault,
  MULTIPLE extends boolean = false,
>(
  ctx: TestContext,
  props: UserSelectProps<ITEM, GROUP, MULTIPLE>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <>
          <div data-testid="outside" />
          <UserSelect<ITEM, GROUP, MULTIPLE>
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
            {...props}
          />
        </>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(
    `#${testRootId(ctx)} [data-testid="${testId}"]`,
  ) as HTMLElement;
const getOutside = (ctx: TestContext) =>
  document
    .getElementById(testRootId(ctx))!
    .querySelector('[data-testid="outside"]') as HTMLElement;
const getItemsList = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [role="listbox"]`,
  ) as HTMLElement;
const getUserSelectValue = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnUserSelectValue()}`) as HTMLDivElement;
const getSelectValues = (ctx: TestContext) =>
  getRender(ctx).querySelectorAll(`.${cnUserSelectValue()}`);
const getSelectValue = (ctx: TestContext, index = 0) =>
  getSelectValues(ctx)[index];
const getRenderValue = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnRenderValue()}`) as HTMLDivElement;
const getIndicatorsDropdown = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnSelect('IndicatorsDropdown')}`,
  ) as HTMLElement;
const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('Input')}`) as HTMLElement;
const getItems = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnUserSelectItem()}`);
const getRenderItems = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnRenderItem()}`);
const getGroups = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnListGroupLabel()}`);
const getItem = (ctx: TestContext, index = 0) => getItems(ctx)[index];
const inputClick = (ctx: TestContext) => fireEvent.click(getInput(ctx));
const outsideClick = (ctx: TestContext) => fireEvent.mouseDown(getOutside(ctx));
const indicatorsDropdownClick = (ctx: TestContext) =>
  fireEvent.click(getIndicatorsDropdown(ctx));
const animateDelay = () =>
  act(() => {
    vi.advanceTimersByTime(animationDuration);
  });

describe.concurrent('Компонент UserSelect', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() =>
        renderComponent(ctx, {
          ...defaultProps,
        }),
      ).not.toThrow();
    }));

  test('Присваивается дополнительный className', (ctx) =>
    context.start(async () => {
      const className = 'className';
      renderComponent(ctx, { ...defaultProps, className });
      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('рендериться с установленным значением при multiple = false', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      const index = 0;
      const value = items[index];

      act(() => {
        renderComponent(ctx, {
          ...defaultProps,
          value,
        });
      });

      expect(getUserSelectValue(ctx).textContent).toContain(
        defaultGetItemLabel(value),
      );

      inputClick(ctx);
      animateDelay();

      expect(getItem(ctx, index)).toHaveClass(
        cnUserSelectItem({ active: true }),
      );
    }));

  test('рендериться с установленным значением при multiple = true', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      const indexes = [0, 1, 5];
      const value = indexes.map((index) => items[index]);

      act(() => {
        renderComponent(ctx, {
          ...defaultProps,
          multiple: true,
          value,
        });
      });

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
      animateDelay();

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

  test('открывается и закрывается по клику', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx, { ...defaultProps });
      });

      inputClick(ctx);
      animateDelay();

      const optionsList = getItemsList(ctx);
      expect(optionsList).toBeInTheDocument();

      inputClick(ctx);
      animateDelay();
      expect(optionsList).not.toBeInTheDocument();
    }));

  test('открывается и закрывается по клику за пределами селекта', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx, { ...defaultProps });
      });

      inputClick(ctx);
      animateDelay();

      const optionsList = getItemsList(ctx);
      expect(optionsList).toBeInTheDocument();

      outsideClick(ctx);
      animateDelay();
      expect(optionsList).not.toBeInTheDocument();
    }));

  test('открывается и закрывается по клику на индикатор', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx, { ...defaultProps });
      });

      indicatorsDropdownClick(ctx);
      animateDelay();

      const optionsList = getItemsList(ctx);
      expect(optionsList).toBeInTheDocument();

      indicatorsDropdownClick(ctx);
      animateDelay();
      expect(optionsList).not.toBeInTheDocument();
    }));

  test('отрисовываются опции', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx, { ...defaultProps });
      });

      inputClick(ctx);
      animateDelay();
      expect(getItems(ctx).length).toEqual(items.length);
    }));

  test('отрисовываются группы', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx, { ...defaultProps, groups });
      });

      inputClick(ctx);
      animateDelay();
      expect(getGroups(ctx).length).toEqual(groups.length);
    }));

  test('проверка onChange при multiple = false', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const elementIndex = 1;

      act(() => {
        renderComponent(ctx, { ...defaultProps, onChange: handleChange });
      });

      inputClick(ctx);
      animateDelay();

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(items[elementIndex], {
        e: expect.any(Object),
      });
    }));

  test('проверка onChange при multiple = true', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      const handleChange = vi.fn();
      const elementIndex = 1;

      act(() => {
        renderComponent(ctx, {
          ...defaultProps,
          multiple: true,
          onChange: handleChange,
        });
      });

      inputClick(ctx);
      animateDelay();

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith([items[elementIndex]], {
        e: expect.any(Object),
      });
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

      fireEvent.focus(getInput(ctx));
      expect(handlerBlur).toHaveBeenCalledTimes(0);

      fireEvent.blur(getInput(ctx));
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

      expect(getRenderValue(ctx).textContent).toEqual(
        defaultGetItemLabel(value),
      );
    }));

  test('renderItem отрабатывает верно', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
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
      });

      inputClick(ctx);
      animateDelay();

      expect(getRenderItems(ctx).length).toEqual(items.length);
    }));

  describe.concurrent('проверка dropdownContainer', () => {
    test('по умолчанию рендерит dropdown в document.body', (ctx) =>
      context.start(async () => {
        vi.useFakeTimers();

        const container = document.createElement('div');
        container.setAttribute('data-testid', 'container');
        document.body.appendChild(container);

        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            dropdownContainer: undefined,
          });
        });

        inputClick(ctx);
        animateDelay();

        expect(document.querySelector('[role="listbox"]')).toBeInTheDocument();
        expect(
          container.querySelector('[role="listbox"]'),
        ).not.toBeInTheDocument();
      }));

    test('рендерит dropdown внутри переданного контейнера', (ctx) =>
      context.start(async () => {
        vi.useFakeTimers();

        const container = document.createElement('div');
        container.setAttribute('data-testid', 'container');
        document.body.appendChild(container);

        act(() => {
          renderComponent(ctx, {
            ...defaultProps,
            dropdownContainer: container,
          });
        });

        inputClick(ctx);
        animateDelay();

        expect(container.querySelector('[role="listbox"]')).toBeInTheDocument();
      }));
  });
});

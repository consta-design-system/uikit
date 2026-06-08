import { clearStack, context, top } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';
import { cnSelect } from '##/components/SelectComponents/cnSelect';
import { cnSelectLoader } from '##/components/SelectComponents/SelectLoader/SelectLoader';
import { propForm } from '##/components/SelectComponents/types';
import { cn } from '##/utils/bem';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
} from '##/utils/vitest';

import { groups, items } from '../__mocks__/data.mock';
import { SelectProps } from '../helpers';
import { defaultGetItemLabel, Select } from '../Select';

const animationDuration = 200;
const testId = 'Select';
const cnRenderValue = cn('RenderValue');
const cnRenderItem = cn('RenderItem');

const defaultProps: SelectProps = {
  items,
  groups,
  value: null,
  onChange: vi.fn(),
  ariaLabel: 'test-select',
};

createRoot();
clearStack();

const renderComponent = (
  ctx: TestContext,
  props: SelectProps = defaultProps,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <>
          <div data-testid="outside" />
          <Select
            value={props.value}
            getItemLabel={props.getItemLabel}
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
  document.getElementById(testOutsideId(ctx)) as HTMLElement;
const getItemsList = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} [role="listbox"]`,
  ) as HTMLElement;
const getControlValue = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnSelect('ControlValue')}`,
  ) as HTMLDivElement;
const getRenderValue = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnRenderValue()}`) as HTMLDivElement;
const getIndicatorsDropdown = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnSelect('IndicatorsDropdown')}`,
  ) as HTMLElement;
const getInput = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('FakeField')}`) as HTMLElement;
const getItems = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnListItem()}`);
const getRenderItems = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnRenderItem()}`);
const getGroups = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnListGroupLabel()}`);
const getItem = (ctx: TestContext, index = 1) =>
  getItems(ctx)[index] as HTMLElement;
const getPlaceholder = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('Placeholder')}`) as HTMLElement;
const getLabel = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('Label')}`) as HTMLElement;
const getCaption = (ctx: TestContext) =>
  getRender(ctx).querySelector(`.${cnSelect('Caption')}`) as HTMLElement;
const getContainer = (ctx: TestContext) =>
  getRender(ctx).querySelector(
    `.${cnSelect('SelectContainer')}`,
  ) as HTMLElement;
const getIsLoading = (ctx: TestContext) =>
  getItemsList(ctx).querySelectorAll(`.${cnSelectLoader('')}` as string);
const inputClick = (ctx: TestContext) => fireEvent.click(getInput(ctx));
const indicatorsDropdownClick = (ctx: TestContext) =>
  fireEvent.click(getIndicatorsDropdown(ctx));
const outsideClick = (ctx: TestContext) => fireEvent.mouseDown(getOutside(ctx));
const animateDelay = () =>
  act(() => {
    vi.advanceTimersByTime(animationDuration);
  });

describe('Компонент Select', () => {
  test('должен рендериться без ошибок', (ctx) =>
    context.start(async () => {
      expect(() => renderComponent(ctx)).not.toThrow();
    }));

  test('Присваивается дополнительный className', (ctx) =>
    context.start(async () => {
      const className = 'className';
      renderComponent(ctx, { ...defaultProps, className });
      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('рендериться с установленным значением', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
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
      animateDelay();

      expect(getItem(ctx, index)).toHaveClass(cnListItem({ checked: true }));
    }));

  test('открывается и закрывается по клику', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx);
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
        renderComponent(ctx);
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
        renderComponent(ctx);
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
        renderComponent(ctx);
      });

      inputClick(ctx);
      animateDelay();
      expect(getItems(ctx).length).toEqual(items.length);
    }));

  test('отрисовываются группы', (ctx) =>
    context.start(async () => {
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx);
      });

      inputClick(ctx);
      animateDelay();
      expect(getGroups(ctx).length).toEqual(groups.length);
    }));

  test('проверка onChange', (ctx) =>
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

  test('вызывается onFocus', (ctx) =>
    context.start(async () => {
      const handlerFocus = vi.fn();
      renderComponent(ctx, { ...defaultProps, onFocus: handlerFocus });

      expect(handlerFocus).toBeCalledTimes(0);
      getInput(ctx).focus();
      expect(handlerFocus).toBeCalledTimes(1);
    }));

  test('вызывается onBlur', (ctx) =>
    context.start(async () => {
      const handlerBlur = vi.fn();
      renderComponent(ctx, { ...defaultProps, onBlur: handlerBlur });

      getInput(ctx).focus();
      expect(handlerBlur).toBeCalledTimes(0);
      getInput(ctx).blur();
      expect(handlerBlur).toBeCalledTimes(1);
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

  test('проверка placeholder', (ctx) =>
    context.start(async () => {
      const placeholder = 'test placeholder';
      renderComponent(ctx, { ...defaultProps, placeholder });

      expect(getPlaceholder(ctx)).toBeInTheDocument();
      expect(getPlaceholder(ctx)).toHaveTextContent(placeholder);
    }));

  test('проверка label', (ctx) =>
    context.start(async () => {
      const label = 'test label';
      renderComponent(ctx, { ...defaultProps, label });

      expect(getLabel(ctx)).toBeInTheDocument();
      expect(getLabel(ctx)).toHaveTextContent(label);
    }));

  test('проверка caption', (ctx) =>
    context.start(async () => {
      const caption = 'test caption';
      renderComponent(ctx, { ...defaultProps, caption });

      expect(getCaption(ctx)).toBeInTheDocument();
      expect(getCaption(ctx)).toHaveTextContent(caption);
    }));

  test('проверка isLoading', (ctx) =>
    context.start(async () => {
      const isLoading = true;
      const amountLoader = 1;
      vi.useFakeTimers();
      act(() => {
        renderComponent(ctx, {
          ...defaultProps,
          items: [],
          isLoading,
        });
      });

      inputClick(ctx);
      animateDelay();
      expect(getIsLoading(ctx).length).toEqual(amountLoader);
    }));

  describe('проверка form', () => {
    propForm.forEach((form) => {
      test(`присваивает класс для form = ${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { ...defaultProps, form });
          expect(getContainer(ctx)).toHaveClass(
            cnSelect('SelectContainer', { form }),
          );
        }));
    });
  });
});

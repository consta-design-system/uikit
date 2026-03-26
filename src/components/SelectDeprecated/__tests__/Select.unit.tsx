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
import { cnListGroupLabel, cnListItem } from '../../ListCanary';
import { cnSelect } from '../../SelectComponentsDeprecated/cnSelect';
import { cnSelectLoader } from '../../SelectComponentsDeprecated/SelectLoader/SelectLoader';
import { propForm } from '../../SelectComponentsDeprecated/types';
import { groups, items } from '../__mocks__/data.mock';
import { defaultGetItemLabel, Select, SelectProps } from '../SelectDeprecated';

createRoot();
clearStack();

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

const renderComponent = (
  ctx: TestContext,
  props: SelectProps = defaultProps,
) => {
  const { items, onChange, value, getItemLabel, ...restProps } = props;
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);

  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <Select
            value={value}
            onChange={onChange}
            items={items}
            getItemLabel={getItemLabel}
            data-testid={testId}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
            {...restProps}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

function getRender(ctx: TestContext) {
  return document
    .getElementById(testRootId(ctx))
    ?.querySelector(`[data-testid="${testId}"]`) as HTMLElement;
}

function getOutside(ctx: TestContext) {
  return document.getElementById(testOutsideId(ctx))!;
}

function getItemsList(ctx: TestContext) {
  return document
    .getElementById(testPopoverId(ctx))
    ?.querySelector('[role="listbox"]') as HTMLElement;
}

function getControlValue(ctx: TestContext) {
  return getRender(ctx).querySelector(
    `.${cnSelect('ControlValue')}`,
  ) as HTMLDivElement;
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
  return getRender(ctx).querySelector(
    `.${cnSelect('FakeField')}`,
  ) as HTMLElement;
}

function getItems(ctx: TestContext) {
  return getItemsList(ctx).querySelectorAll(`.${cnListItem()}`);
}

function getRenderItems(ctx: TestContext) {
  return getItemsList(ctx).querySelectorAll(`.${cnRenderItem()}`);
}

function getGroups(ctx: TestContext) {
  return getItemsList(ctx).querySelectorAll(`.${cnListGroupLabel()}`);
}

function getItem(ctx: TestContext, index = 1) {
  return getItems(ctx)[index];
}

function getPlaceholder(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnSelect('Placeholder')}`);
}

function getLabel(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnSelect('Label')}`);
}

function getCaption(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnSelect('Caption')}`);
}

function getContainer(ctx: TestContext) {
  return getRender(ctx).querySelector(`.${cnSelect('SelectContainer')}`);
}

function getIsLoading(ctx: TestContext) {
  return getItemsList(ctx).querySelectorAll(`.${cnSelectLoader('')}`);
}

function inputClick(ctx: TestContext) {
  fireEvent.click(getInput(ctx));
}

function outsideClick(ctx: TestContext) {
  fireEvent.mouseDown(getOutside(ctx));
}

describe.concurrent('Компонент Select', () => {
  test('должен рендериться без ошибок', async (ctx) => {
    await context.start(async () => {
      expect(() => renderComponent(ctx, defaultProps)).not.toThrow();
    });
  });

  test(`Присваивается дополнительный className`, async (ctx) => {
    await context.start(async () => {
      const className = 'className';

      renderComponent(ctx, { ...defaultProps, className });

      expect(getRender(ctx)).toHaveClass(className);
    });
  });

  test('рендериться с установленным значением', async (ctx) => {
    await context.start(async () => {
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
    });
  });

  test('отрисовываются опции', async (ctx) => {
    await context.start(async () => {
      renderComponent(ctx, defaultProps);

      inputClick(ctx);

      expect(getItems(ctx).length).toEqual(items.length);
    });
  });

  test('отрисовываются группы', async (ctx) => {
    await context.start(async () => {
      renderComponent(ctx, defaultProps);

      inputClick(ctx);

      expect(getGroups(ctx).length).toEqual(groups.length);
    });
  });

  test('проверка onChange', async (ctx) => {
    await context.start(async () => {
      const handleChange = vi.fn();
      const elementIndex = 1;
      renderComponent(ctx, { ...defaultProps, onChange: handleChange });

      inputClick(ctx);

      fireEvent.click(getItem(ctx, elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: items[elementIndex] }),
      );
    });
  });

  test('вызывается onFocus', async (ctx) => {
    await context.start(async () => {
      const handlerFocus = vi.fn();
      renderComponent(ctx, { ...defaultProps, onFocus: handlerFocus });

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      fireEvent.focus(getInput(ctx));

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    });
  });

  test('вызывается onBlur', async (ctx) => {
    await context.start(async () => {
      const handlerBlur = vi.fn();
      renderComponent(ctx, { ...defaultProps, onBlur: handlerBlur });

      fireEvent.focus(getInput(ctx));

      expect(handlerBlur).toHaveBeenCalledTimes(0);

      fireEvent.blur(getInput(ctx));

      expect(handlerBlur).toHaveBeenCalledTimes(1);
    });
  });

  test('renderValue отрабатывает верно', async (ctx) => {
    await context.start(async () => {
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
    });
  });

  test('renderItem отрабатывает верно', async (ctx) => {
    await context.start(async () => {
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
    });
  });

  test('проверка placeholder', async (ctx) => {
    await context.start(async () => {
      const placeholder = 'test placeholder';
      renderComponent(ctx, {
        ...defaultProps,
        placeholder,
      });

      expect(getPlaceholder(ctx)).toBeInTheDocument();
      expect(getPlaceholder(ctx)).toHaveTextContent(placeholder);
    });
  });

  test('проверка label', async (ctx) => {
    await context.start(async () => {
      const label = 'test label';
      renderComponent(ctx, {
        ...defaultProps,
        label,
      });

      expect(getLabel(ctx)).toBeInTheDocument();
      expect(getLabel(ctx)).toHaveTextContent(label);
    });
  });

  test('проверка caption', async (ctx) => {
    await context.start(async () => {
      const caption = 'test caption';
      renderComponent(ctx, {
        ...defaultProps,
        caption,
      });

      expect(getCaption(ctx)).toBeInTheDocument();
      expect(getCaption(ctx)).toHaveTextContent(caption);
    });
  });

  test('проверка isLoading', async (ctx) => {
    await context.start(async () => {
      const isLoading = true;
      const amountLoader = 1;
      renderComponent(ctx, {
        ...defaultProps,
        isLoading,
      });

      inputClick(ctx);

      expect(getIsLoading(ctx).length).toEqual(amountLoader);
    });
  });

  describe.concurrent('проверка form', () => {
    propForm.forEach((form) => {
      test(`присваивает класс для form = ${form}`, async (ctx) => {
        await context.start(async () => {
          renderComponent(ctx, { ...defaultProps, form });

          expect(getContainer(ctx)).toHaveClass(
            cnSelect('SelectContainer', { form }),
          );
        });
      });
    });
  });
});

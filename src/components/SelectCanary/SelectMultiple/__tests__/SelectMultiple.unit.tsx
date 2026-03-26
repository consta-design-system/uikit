import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act, fireEvent } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';

import { createIconMock } from '##/../__mocks__/IconMock';
import { cnFieldArrayValueInlineControl } from '##/components/FieldComponents';
import { cnFieldArrayValueItem } from '##/components/FieldComponents/FieldArrayValueItem';
import { cnFieldControlLayout } from '##/components/FieldComponents/FieldControlLayout';
import { cnListBox, cnListItem, cnListLoader } from '##/components/ListCanary';
import { presetGpnDefault, Theme } from '##/components/Theme';
import { animateTimeout } from '##/mixs/MixPopoverAnimate';
import {
  createRoot,
  TestContext,
  testOutsideId,
  testPopoverId,
  testRootId,
  tick,
} from '##/utils/vitest';

import {
  SelectGroupDefault,
  SelectItemDefault,
  SelectPropRenderItem,
  SelectPropRenderValue,
  SelectProps,
} from '../..';
import { cnSelectControlLayout } from '../../SelectControlLayout';
import { cnSelectCreateButton } from '../../SelectCreateButton';
import { cnSelectItemAll } from '../../SelectItemAll';
import { SelectMultiple } from '../SelectMultiple';

createRoot();
clearStack();

/**
 * testId - идентификатор data-testid, используемый для поиска компонента в тестах.
 */
const testId = 'SelectMultipleCanary';

/**
 * animationDuration - длительность анимации в миллисекундах, используется для тестирования анимаций.
 */

const renderComponent = (
  ctx: TestContext,
  props: SelectProps<SelectItemDefault, SelectGroupDefault, true>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectMultiple
            data-testid={testId}
            multiple
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
            {...props}
          />
        </Theme>
      </reatomContext.Provider>,
    );
  });
};

const getRender = (ctx: TestContext) =>
  document.querySelector(`#${testRootId(ctx)} *[data-testid=${testId}]`);

const getOutside = (ctx: TestContext) =>
  document.querySelector(`#${testOutsideId(ctx)}`) as HTMLDivElement;
const getInput = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`input`) as HTMLInputElement;
const inputClick = (ctx: TestContext) => {
  fireEvent.click(getInput(ctx));
};

// const getDropdown = (ctx) => screen.queryByRole(`listbox`) as HTMLDivElement;
const getDropdown = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLDivElement;
const outsideClick = (ctx: TestContext) => {
  fireEvent.mouseDown(getOutside(ctx));
};
const getValueControl = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnFieldArrayValueInlineControl()}`,
  ) as HTMLDivElement;
const getItems = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];
const getSelectAllOptions = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.${cnSelectItemAll()}`,
  ) as unknown as HTMLDivElement[];
const getSelectAllOption = (ctx: TestContext, index: number = 0) =>
  getSelectAllOptions(ctx)[index] as HTMLDivElement;

const getItem = (ctx: TestContext, index: number = 0) =>
  getItems(ctx)[index] as HTMLDivElement;
const getClearButton = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(
    `.${cnSelectControlLayout('ClearButton')}`,
  ) as HTMLButtonElement;
const getLoader = (ctx: TestContext) =>
  getDropdown(ctx).querySelector(`.${cnListLoader()}`) as HTMLDivElement;
const getCreateButton = (ctx: TestContext) =>
  getDropdown(ctx).querySelector(
    `.${cnSelectCreateButton()}`,
  ) as HTMLDivElement;
const onCreateClick = (ctx: TestContext) =>
  fireEvent.click(getCreateButton(ctx));

const getValueItems = (ctx: TestContext) =>
  getRender(ctx)?.querySelectorAll(
    `.${cnFieldArrayValueItem()}`,
  ) as unknown as HTMLElement[];

const getGroups = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.ListGroupLabel`,
  ) as unknown as HTMLDivElement[];

const items: SelectItemDefault[] = [
  { id: 1, label: 'Item 1', groupId: 1 },
  { id: 2, label: 'Item 2', groupId: 1 },
  { id: 3, label: 'Item 3', groupId: 2 },
];

const itemsWithDisabled: SelectItemDefault[] = [
  { id: 1, label: 'Item 1', groupId: 1, disabled: true },
  { id: 2, label: 'Item 2', groupId: 1 },
  { id: 3, label: 'Item 3', groupId: 2, disabled: true },
];

const groups: SelectGroupDefault[] = [
  { id: 1, label: 'Group 1' },
  { id: 2, label: 'Group 2' },
];

describe.concurrent(`${testId}`, () => {
  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      const render = renderComponent(ctx, { items, onChange: vi.fn() });
      await wrap(tick());

      expect(() => render).not.toThrow();
    }));

  test('отображает плейсхолдер, если значение не выбрано', async (ctx) =>
    context.start(async () => {
      const placeholder = 'Выберите элемент';
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        placeholder,
      });

      await wrap(tick());

      expect(getInput(ctx).placeholder).toEqual(placeholder);
    }));

  test('отображается inputDefaultValue', (ctx) =>
    context.start(async () => {
      const inputDefaultValue = 'я ищу';

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        inputDefaultValue,
        input: true,
      });

      await wrap(tick());

      expect(getInput(ctx).value).toEqual(inputDefaultValue);
    }));

  test('отображается inputValue', async (ctx) =>
    context.start(async () => {
      const inputValue = 'я ищу';

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        inputValue,
        input: true,
      });

      await wrap(tick());

      expect(getInput(ctx).value).toEqual(inputValue);
    }));

  test('проверка ref', async (ctx) =>
    context.start(async () => {
      const ref = { current: null };
      act(() => {
        renderComponent(ctx, { items, ref, onChange: vi.fn() });
      });

      await wrap(tick());

      expect(ref.current).toBeInTheDocument();
    }));

  test('проверка inputRef', async (ctx) =>
    context.start(async () => {
      const inputRef = { current: null };

      renderComponent(ctx, { items, inputRef, onChange: vi.fn() });

      await wrap(tick());

      expect(inputRef.current).toBeInTheDocument();
    }));

  test('Присваивается дополнительный className', async (ctx) =>
    context.start(async () => {
      const className = 'custom-class';

      renderComponent(ctx, { items, className, onChange: vi.fn() });

      await wrap(tick());

      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('value верно рендерится', async (ctx) =>
    context.start(async () => {
      const value = [items[2], items[1]];
      renderComponent(ctx, {
        items,
        value,
        onChange: vi.fn(),
      });

      await wrap(tick());

      expect(getValueItems(ctx).length).toEqual(value.length);
      expect(getValueControl(ctx).textContent).toEqual(
        value.map((item) => item.label).join(''),
      );
    }));

  test('Присваиваются дополнительные атрибуты', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        'onChange': vi.fn(),
        'aria-placeholder': 'test-autocomplete',
      });
      await wrap(tick());

      expect(getRender(ctx)).toHaveAttribute(
        'aria-placeholder',
        'test-autocomplete',
      );
    }));

  test('открывается по клику', (ctx) =>
    context.start(async () => {
      // const frame = top();
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
      });

      await wrap(tick());

      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).not.toBeInTheDocument();

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).toBeInTheDocument();
    }));

  test('открыто при dropdownOpen=true', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        dropdownOpen: true,
      });
      await wrap(tick());

      expect(getDropdown(ctx)).toBeInTheDocument();
    }));

  test('проверка onDropdownOpen', (ctx) =>
    context.start(async () => {
      const handlerDropdownOpen = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onDropdownOpen: handlerDropdownOpen,
      });

      await wrap(tick());

      inputClick(ctx);

      await wrap(tick());
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(2);

      await wrap(tick());
      outsideClick(ctx);

      await wrap(tick());
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(3);

      inputClick(ctx);

      await wrap(tick());
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(4);

      outsideClick(ctx);

      await wrap(tick());
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(5);
    }));

  test('Отображаются элементы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        dropdownOpen: true,
      });
      await wrap(tick());

      items.map((item, index) =>
        expect(getItem(ctx, index).textContent).toEqual(item.label),
      );
    }));

  test('не открывается по клику при disabled', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { items, onChange: vi.fn(), disabled: true });
      await wrap(tick());

      inputClick(ctx);

      await wrap(tick());

      expect(getDropdown(ctx)).not.toBeInTheDocument();
    }));

  test('проверка onChange', (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: onChangeMock,
        dropdownOpen: true,
      });
      await wrap(tick());

      getItem(ctx, 0).click();

      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith([items[0]], {
        e: expect.any(Object),
      });
    }));

  test('проверка onFocus', async (ctx) =>
    context.start(async () => {
      const handlerFocus = vi.fn();
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onFocus: handlerFocus,
      });
      await wrap(tick());

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      getInput(ctx).focus();

      await wrap(tick());

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    }));

  test('проверка onBlur', async (ctx) =>
    context.start(async () => {
      const handlerBlur = vi.fn();
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onBlur: handlerBlur,
      });

      await wrap(tick());

      getInput(ctx).focus();

      expect(handlerBlur).toHaveBeenCalledTimes(0);
      getInput(ctx).blur();
      expect(handlerBlur).toHaveBeenCalledTimes(1);
    }));

  test('поддерживает управление с клавиатуры', async (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, { items, onChange: onChangeMock });
      await wrap(tick());

      const input = getInput(ctx);

      input.focus();

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onChangeMock).toHaveBeenCalledWith([items[1]], {
        e: expect.any(Object),
      });

      fireEvent.keyDown(input, { key: 'Escape' });

      await wrap(tick());
      await wrap(sleep(animateTimeout));

      // закрытие по esc
      expect(getDropdown(ctx)).not.toBeInTheDocument();
      // await wrap(tick, frame)();

      fireEvent.keyDown(input, { key: 'Enter' });
      await wrap(tick());
      await wrap(sleep(animateTimeout));

      // открытие по enter
      expect(getDropdown(ctx)).toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'Tab' });
      await wrap(tick());
      await wrap(sleep(animateTimeout));

      // закрытие по tab
      expect(getDropdown(ctx)).not.toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'Tab' });
      await wrap(tick());
      await wrap(sleep(animateTimeout));
      await wrap(tick());

      // снятие фокуса по tab
      expect(input).not.toHaveFocus();
    }));

  test('disable - управление с клавиатуры не работает', (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: onChangeMock,
        disabled: true,
      });

      await wrap(tick());

      const input = getInput(ctx);
      fireEvent.focus(input);

      await wrap(tick());

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      await wrap(tick());
      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).not.toBeInTheDocument();
      expect(input).not.toHaveFocus();

      fireEvent.keyDown(input, { key: 'Enter' });
      await wrap(tick());
      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).not.toBeInTheDocument();
      expect(input).not.toHaveFocus();
    }));

  test('имеется возможность вводить текст в input', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        input: true,
      });

      await wrap(tick());

      const input = getInput(ctx);

      fireEvent.change(input, { target: { value: 'change' } });
      await wrap(tick());

      expect(input.value).toEqual('change');
    }));

  test('при вводе текста в input срабатывает onInput', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        input: true,
      });
      await wrap(tick());

      fireEvent.change(getInput(ctx), { target: { value: 'change' } });
      await wrap(tick());

      expect(onInputChangeMock).toHaveBeenCalledTimes(1);
      expect(onInputChangeMock).toHaveBeenCalledWith('change');
    }));

  test('disabled - при вводе текста в input не срабатывает onInput', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        disabled: true,
        input: true,
      });

      await wrap(tick());

      fireEvent.change(getInput(ctx), { target: { value: 'change' } });
      await wrap(tick());

      expect(onInputChangeMock).not.toHaveBeenCalled();
    }));

  test('отображается inputDefaultValue', (ctx) =>
    context.start(async () => {
      const inputDefaultValue = 'я ищу';

      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: vi.fn(),
        inputDefaultValue,
        input: true,
      });

      await wrap(tick());

      expect(getInput(ctx).value).toEqual(inputDefaultValue);
    }));

  test('disabled - при удалении текста по Backspace он не удаляется', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();
      const inputValue = 'я ищу';

      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        inputValue,
        disabled: true,
        input: true,
      });

      await wrap(tick());

      fireEvent.keyDown(getInput(ctx), { key: 'Backspace' });
      fireEvent.keyDown(getInput(ctx), { key: 'Backspace' });
      fireEvent.keyDown(getInput(ctx), { key: 'Backspace' });

      await wrap(tick());

      expect(getInput(ctx).value).toEqual(inputValue);
    }));

  test('clearButton отображается при выбранном значении', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: vi.fn(),
        clearButton: true,
      });

      await wrap(tick());

      const clearButton = getClearButton(ctx);

      expect(clearButton).toBeInTheDocument();
    }));

  test('очищает значение при нажатии на кнопку очистки', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: handleChange,
        clearButton: true,
      });

      await wrap(tick());

      const clearButton = getClearButton(ctx);
      fireEvent.click(clearButton);

      expect(handleChange).toHaveBeenCalledWith(null, {
        e: expect.any(Object),
      });
    }));

  test('очищает значение при нажатии на кнопку Backspace', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: handleChange,
        clearButton: true,
      });

      await wrap(tick());

      fireEvent.keyDown(getInput(ctx), { key: 'Backspace' });

      expect(handleChange).toHaveBeenCalledWith(null, {
        e: expect.any(Object),
      });
    }));

  test('disabled - не очищает значение при нажатии на кнопку очистки', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: handleChange,
        clearButton: true,
        disabled: true,
      });

      await wrap(tick());

      const clearButton = getClearButton(ctx);
      fireEvent.click(clearButton);

      expect(handleChange).not.toHaveBeenCalled();
    }));

  test('disabled - не очищает значение при нажатии на кнопку Backspace', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: [items[0]],
        onChange: handleChange,
        clearButton: true,
        disabled: true,
      });

      await wrap(tick());

      fireEvent.keyDown(getInput(ctx), { key: 'Backspace' });

      expect(handleChange).not.toHaveBeenCalled();
    }));

  test('группы отображаются', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        groups,
        value: [items[0]],
        onChange: vi.fn(),
      });
      await wrap(tick());
      inputClick(ctx);
      await wrap(sleep(animateTimeout));
      groups.map((group, index) =>
        expect(getGroups(ctx)[index].textContent).toEqual(group.label),
      );
    }));

  describe.concurrent('проверка dropdownForm', () => {
    (['default', 'brick', 'round'] as const).map((dropdownForm) => {
      test(`dropdownForm = ${dropdownForm}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, dropdownForm, onChange: vi.fn() });
          await wrap(tick());
          inputClick(ctx);
          await wrap(sleep(animateTimeout));
          expect(getDropdown(ctx)).toHaveClass(
            cnListBox({ form: dropdownForm }).split(' ')[1],
          );
        }));
    });
  });

  describe.concurrent('проверка form', () => {
    (
      [
        'default',
        'defaultClear',
        'defaultBrick',
        'brick',
        'brickDefault',
        'brickClear',
        'brickRound',
        'round',
        'roundClear',
        'roundBrick',
        'clearRound',
        'clearDefault',
        'clearBrick',
        'clear',
      ] as const
    ).map((form) => {
      test(`form = ${form}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, form, onChange: vi.fn() });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(
            cnFieldControlLayout({ form }).split(' ')[1],
          );
        }));
    });
  });

  describe.concurrent('проверка view', () => {
    (['default', 'clear'] as const).map((view) => {
      test(`view = ${view}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, view, onChange: vi.fn() });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(
            cnFieldControlLayout({ view }).split(' ')[1],
          );
        }));
    });
  });

  describe.concurrent('проверка status', () => {
    (['alert', 'success', 'warning'] as const).map((status) => {
      test(`status = ${status}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, status, onChange: vi.fn() });
          await wrap(tick());
          expect(getRender(ctx)).toHaveClass(
            cnFieldControlLayout({ status }).split(' ')[1],
          );
        }));
    });
  });

  test('элементы disabled отображаются с соответствущем классом', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { items: itemsWithDisabled, onChange: vi.fn() });
      await wrap(tick());
      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      itemsWithDisabled.map((item, index) => {
        if (item.disabled) {
          expect(getItem(ctx, index)).toHaveClass(
            cnListItem({ disabled: true }).split(' ')[1],
          );
        } else {
          expect(getItem(ctx, index)).not.toHaveClass(
            cnListItem({ disabled: true }).split(' ')[1],
          );
        }
      });
    }));

  describe.concurrent('по элементам disabled не отрабатывает onChange', () => {
    itemsWithDisabled.map((item, index) => {
      test(`item ${index} disabled = ${item.disabled}`, (ctx) =>
        context.start(async () => {
          const handleChange = vi.fn();

          renderComponent(ctx, {
            items: itemsWithDisabled,
            onChange: handleChange,
          });
          await wrap(tick());

          inputClick(ctx);

          await wrap(sleep(animateTimeout));
          fireEvent.click(getItem(ctx, index));
          if (item.disabled) {
            expect(handleChange).not.toHaveBeenCalled();
          } else {
            expect(handleChange).toHaveBeenCalled();
          }
        }));
    });
  });

  describe.concurrent('проверка isLoading', () => {
    test('isLoading = true', (ctx) =>
      context.start(async () => {
        renderComponent(ctx, { items, isLoading: true, onChange: vi.fn() });
        await wrap(tick());

        inputClick(ctx);

        await wrap(sleep(animateTimeout));

        expect(getLoader(ctx)).toBeInTheDocument();
      }));
    [false, undefined].map((isLoading) => {
      test(`isLoading = ${isLoading}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, isLoading, onChange: vi.fn() });
          await wrap(tick());

          inputClick(ctx);

          await wrap(sleep(animateTimeout));

          expect(getLoader(ctx)).not.toBeInTheDocument();
        }));
    });
  });

  test('проверка onCreate', (ctx) =>
    context.start(async () => {
      const onCreate = vi.fn();
      const inputValue = 'test';

      renderComponent(ctx, { items, onCreate, inputValue, onChange: vi.fn() });
      await wrap(tick());

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getCreateButton(ctx)).toBeInTheDocument();

      onCreateClick(ctx);

      expect(onCreate).toHaveBeenCalled();
      expect(onCreate).toHaveBeenCalledWith(inputValue, {
        e: expect.any(Object),
      });
    }));

  test('проверка labelForCreate', (ctx) =>
    context.start(async () => {
      const labelForCreate = 'Создать';

      renderComponent(ctx, {
        items,
        labelForCreate,
        onCreate: vi.fn(),
        onChange: vi.fn(),
      });
      await wrap(tick());

      inputClick(ctx);
      await wrap(sleep(animateTimeout));

      expect(getCreateButton(ctx)).toBeInTheDocument();
    }));

  test('проверка iconClear', (ctx) =>
    context.start(async () => {
      const iconClear = createIconMock('iconClear');

      renderComponent(ctx, {
        items,
        iconClear,
        clearButton: true,
        inputValue: 'test',
        onCreate: vi.fn(),
        onChange: vi.fn(),
      });

      await wrap(tick());

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getClearButton(ctx).textContent).toEqual('iconClear');
    }));

  test('проверка renderItem', (ctx) =>
    context.start(async () => {
      const renderItem: SelectPropRenderItem<SelectItemDefault> = ({
        item,
      }) => <div className="test">{item.label}</div>;

      renderComponent(ctx, {
        items,
        renderItem,
        onChange: vi.fn(),
      });
      await wrap(tick());

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx).querySelectorAll('.test')[0]).toBeInTheDocument();
      expect(getDropdown(ctx).querySelectorAll('.test')[0].textContent).toEqual(
        items[0].label,
      );
    }));

  test('проверка renderValue', (ctx) =>
    context.start(async () => {
      const renderValue: SelectPropRenderValue<SelectItemDefault, true> = ({
        value,
      }) => (
        <>
          {value.map((item) => (
            <div className="test">{item.label}</div>
          ))}
        </>
      );

      renderComponent(ctx, {
        items,
        renderValue,
        value: [items[0]],
        onChange: vi.fn(),
      });

      await wrap(tick());
      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getValueControl(ctx).querySelector('.test')).toBeInTheDocument();
    }));

  test('проверка selectAll', (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        selectAll: true,
        onChange: onChangeMock,
      });
      await wrap(tick());

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      const item = getItem(ctx, 0);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());
    }));

  test('проверка selectAll в группе', (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        value: items,
        groups,
        selectAll: true,
        onChange: onChangeMock,
      });

      await wrap(tick());
      inputClick(ctx);
      await wrap(sleep(animateTimeout));

      expect(getSelectAllOptions(ctx).length).toEqual(2);
    }));

  test('проверка selectAllLabel', (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();
      const selectAllLabel = 'Все';

      renderComponent(ctx, {
        items,
        selectAll: true,
        onChange: onChangeMock,
        selectAllLabel,
      });
      await wrap(tick());

      inputClick(ctx);
      await wrap(sleep(animateTimeout));

      const item = getItem(ctx, 0);
      expect(item).toHaveTextContent(selectAllLabel);
      expect(item).toHaveClass(cnSelectItemAll());
    }));

  describe.concurrent('проверка клика selectAll', () => {
    test('если не выбрано то выбирает все', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();

        renderComponent(ctx, {
          items,
          selectAll: true,
          onChange: onChangeMock,
        });

        await wrap(tick());

        inputClick(ctx);

        await wrap(sleep(animateTimeout));

        const item = getItem(ctx, 0);

        expect(item).toHaveTextContent('Выбрать все');
        expect(item).toHaveClass(cnSelectItemAll());

        fireEvent.click(item);
        expect(onChangeMock).toHaveBeenCalledWith(items, {
          e: expect.any(Object),
        });
      }));
    test('если выбран хотя бы 1  выбрано то выбирает все', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();

        renderComponent(ctx, {
          items,
          value: [items[0]],
          selectAll: true,
          onChange: onChangeMock,
        });

        await wrap(tick());

        inputClick(ctx);

        await wrap(sleep(animateTimeout));

        const item = getItem(ctx, 0);

        expect(item).toHaveTextContent('Выбрать все');
        expect(item).toHaveClass(cnSelectItemAll());

        fireEvent.click(item);
        expect(onChangeMock).toHaveBeenCalledWith(items, {
          e: expect.any(Object),
        });
      }));
    test('если выбраны все то отменяет все выборы', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();

        renderComponent(ctx, {
          items,
          value: items,
          selectAll: true,
          onChange: onChangeMock,
        });

        await wrap(tick());

        inputClick(ctx);

        await wrap(sleep(animateTimeout));

        const item = getItem(ctx, 0);

        expect(item).toHaveTextContent('Выбрать все');
        expect(item).toHaveClass(cnSelectItemAll());

        fireEvent.click(item);
        expect(onChangeMock).toHaveBeenCalledWith([], {
          e: expect.any(Object),
        });
      }));
    test('c группами, если не выбрано то выбирает все в группе', (ctx) =>
      context.start(async () => {
        const onChangeMock = vi.fn();
        const testingGroupIndex = 0;

        renderComponent(ctx, {
          items,
          groups,
          selectAll: true,
          onChange: onChangeMock,
        });
        await wrap(tick());

        inputClick(ctx);

        await wrap(sleep(animateTimeout));

        const item = getSelectAllOption(ctx, testingGroupIndex);

        expect(item).toHaveTextContent('Выбрать все');
        expect(item).toHaveClass(cnSelectItemAll());

        fireEvent.click(item);
        expect(onChangeMock).toHaveBeenCalledWith(
          items.filter((item) => item.groupId === groups[testingGroupIndex].id),
          {
            e: expect.any(Object),
          },
        );
      }));
  });
});

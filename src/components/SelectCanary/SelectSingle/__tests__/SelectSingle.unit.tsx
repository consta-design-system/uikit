import { clearStack, context, sleep, top, wrap } from '@reatom/core';
import { reatomContext } from '@reatom/react';
import { act } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { describe, expect, test, vi } from 'vitest';
import { userEvent } from 'vitest/browser';

import { createIconMock } from '##/../__mocks__/IconMock';
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
  SelectSingle,
} from '../..';
import { cnSelectControlLayout } from '../../SelectControlLayout';
import { cnSelectCreateButton } from '../../SelectCreateButton';
import { cnSelectInput } from '../../SelectInput';

const testId = 'SelectSingleCanary';
createRoot();
clearStack();

// const rootFrame = context.start();

const renderComponent = (
  ctx: TestContext,
  props: SelectProps<SelectItemDefault, SelectGroupDefault, false>,
) => {
  const root = ReactDOM.createRoot(document.getElementById(testRootId(ctx))!);
  act(() => {
    root.render(
      <reatomContext.Provider value={top()}>
        <Theme preset={presetGpnDefault}>
          <SelectSingle
            data-testid={testId}
            {...props}
            dropdownContainer={document.getElementById(testPopoverId(ctx))!}
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
const inputClick = (ctx: TestContext) => getInput(ctx).click();

const getDropdown = (ctx: TestContext) =>
  document.querySelector(
    `#${testPopoverId(ctx)} *[role="listbox"]`,
  ) as HTMLDivElement;

const getGroups = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.ListGroupLabel`,
  ) as unknown as HTMLDivElement[];

const getValueControl = (ctx: TestContext) =>
  getRender(ctx)?.querySelector(`.${cnSelectInput()}`) as HTMLDivElement;
const getItems = (ctx: TestContext) =>
  getDropdown(ctx).querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];

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
const onCreateClick = (ctx: TestContext) => getCreateButton(ctx).click();

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

describe(`${testId}`, () => {
  //   const getItemLabel = (item: { id: number; label: string }) => item.label;
  //   const getItemKey = (item: { id: number; label: string }) => item.id;

  test('рендерится без ошибок', (ctx) =>
    context.start(async () => {
      const render = await wrap(
        renderComponent(ctx, { items, onChange: vi.fn() }),
      );

      expect(() => render).not.toThrow();
    }));

  test('отображает плейсхолдер, если значение не выбрано', (ctx) =>
    context.start(async () => {
      const placeholder = 'Выберите элемент';
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        placeholder,
      });

      expect(getInput(ctx).placeholder).toEqual(placeholder);
    }));

  test('отображает выбранное значение', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        value: items[1],
        onChange: vi.fn(),
        placeholder: 'Выберите элемент',
      });

      expect(getValueControl(ctx).textContent).toEqual(items[1].label);
    }));

  test('проверка ref', (ctx) =>
    context.start(async () => {
      const ref = { current: null };

      renderComponent(ctx, { items, ref, onChange: vi.fn() });
      expect(ref.current).toBeTruthy();
    }));

  test('проверка inputRef', async (ctx) =>
    context.start(async () => {
      const inputRef = { current: null };

      renderComponent(ctx, { items, inputRef, onChange: vi.fn() });

      expect(inputRef.current).toBeInTheDocument();
    }));

  test('Присваивается дополнительный className', async (ctx) =>
    context.start(async () => {
      const className = 'custom-class';

      renderComponent(ctx, { items, className, onChange: vi.fn() });

      expect(getRender(ctx)).toHaveClass(className);
    }));

  test('Присваиваются дополнительные атрибуты', async (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        'onChange': vi.fn(),
        'aria-placeholder': 'test-autocomplete',
      });

      expect(getRender(ctx)).toHaveAttribute(
        'aria-placeholder',
        'test-autocomplete',
      );
    }));

  test('открывается по клику', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        input: true,
      });

      expect(getDropdown(ctx)).not.toBeInTheDocument();

      await wrap(userEvent.click(getInput(ctx)));

      await wrap(sleep(animateTimeout));

      await wrap(sleep());

      expect(getDropdown(ctx)).toBeInTheDocument();
    }));

  test('закрывается по клику вне компонента', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { items, onChange: vi.fn() });

      await wrap(userEvent.click(getInput(ctx)));
      await wrap(sleep(animateTimeout));

      await wrap(tick());

      expect(getDropdown(ctx)).toBeInTheDocument();

      await wrap(userEvent.click(getOutside(ctx)));
      await wrap(sleep(animateTimeout));

      await wrap(tick());

      expect(getDropdown(ctx)).not.toBeInTheDocument();
    }));

  test('Отображаются элементы', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        dropdownOpen: true,
      });

      items.map((item, index) =>
        expect(getItem(ctx, index).textContent).toEqual(item.label),
      );
    }));

  test('не открывается по клику при disabled', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { items, onChange: vi.fn(), disabled: true });

      inputClick(ctx);

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

      getItem(ctx, 0).click();

      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(items[0], {
        e: expect.any(Object),
      });
    }));

  test('проверка onFocus', (ctx) =>
    context.start(async () => {
      const handlerFocus = vi.fn();
      renderComponent(ctx, { items, onChange: vi.fn(), onFocus: handlerFocus });

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      getInput(ctx).focus();

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    }));

  test('проверка onBlur', (ctx) =>
    context.start(async () => {
      const handlerBlur = vi.fn();
      renderComponent(ctx, { items, onChange: vi.fn(), onBlur: handlerBlur });
      getInput(ctx).focus();
      expect(handlerBlur).toHaveBeenCalledTimes(0);
      getInput(ctx).blur();
      expect(handlerBlur).toHaveBeenCalledTimes(1);
    }));

  test('проверка onDropdownOpen', (ctx) =>
    context.start(async () => {
      const handlerDropdownOpen = vi.fn();
      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onDropdownOpen: handlerDropdownOpen,
        input: true,
      });

      await wrap(userEvent.click(getInput(ctx)));

      expect(handlerDropdownOpen).toHaveBeenCalledTimes(2);

      await wrap(userEvent.click(getOutside(ctx)));

      expect(handlerDropdownOpen).toHaveBeenCalledTimes(3);

      await wrap(userEvent.click(getInput(ctx)));

      expect(handlerDropdownOpen).toHaveBeenCalledTimes(4);

      await wrap(userEvent.click(getOutside(ctx)));

      expect(handlerDropdownOpen).toHaveBeenCalledTimes(5);
    }));

  test('поддерживает управление с клавиатуры', async (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, { items, onChange: onChangeMock });

      getInput(ctx).focus();

      await wrap(userEvent.keyboard('{ArrowDown}'));

      await wrap(sleep(animateTimeout));

      await wrap(tick());

      expect(getDropdown(ctx)).toBeInTheDocument();

      await wrap(userEvent.keyboard('{ArrowUp}{ArrowDown}{Enter}'));

      expect(onChangeMock).toHaveBeenCalledWith(items[1], {
        e: expect.any(Object),
      });

      await wrap(userEvent.keyboard('{Escape}'));

      await wrap(sleep(animateTimeout));

      await wrap(tick());

      // закрытие по esc
      expect(getDropdown(ctx)).not.toBeInTheDocument();

      await wrap(userEvent.keyboard('{Enter}'));

      await wrap(sleep(animateTimeout));

      await wrap(tick());
      // открытие по enter
      expect(getDropdown(ctx)).toBeInTheDocument();

      await wrap(userEvent.tab());

      await wrap(sleep(animateTimeout));

      await wrap(tick());

      // закрытие по tab
      expect(getDropdown(ctx)).not.toBeInTheDocument();

      await wrap(userEvent.tab());

      await wrap(tick());

      // снятие фокуса по tab
      expect(getInput(ctx)).not.toHaveFocus();
    }));

  test('disable - управление с клавиатуры не работает', (ctx) =>
    context.start(async () => {
      const onChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: onChangeMock,
        disabled: true,
      });

      getInput(ctx).focus();

      await wrap(userEvent.keyboard('{ArrowDown}'));

      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).not.toBeInTheDocument();
      expect(getInput(ctx)).not.toHaveFocus();

      await wrap(userEvent.keyboard('{Enter}'));

      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx)).not.toBeInTheDocument();
      expect(getInput(ctx)).not.toHaveFocus();
    }));

  test('имеется возможность вводить текст в input', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        input: true,
      });

      await userEvent.type(getInput(ctx), 'change');

      expect(getInput(ctx).value).toEqual('change');
    }));

  test('при вводе текста в input срабатывает onInput', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        input: true,
      });

      const value = 'change';

      await userEvent.type(getInput(ctx), value);

      expect(onInputChangeMock).toHaveBeenCalledTimes(value.length);
      expect(onInputChangeMock).toHaveBeenCalledWith(value);
    }));

  test('disabled - при вводе текста в input не срабатывает onInput', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        disabled: true,
        input: true,
      });

      const value = 'change';

      await userEvent.type(getInput(ctx), value);

      expect(onInputChangeMock).not.toHaveBeenCalled();
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

      expect(getInput(ctx).value).toEqual(inputDefaultValue);
    }));

  test('отображается inputValue', (ctx) =>
    context.start(async () => {
      const inputValue = 'я ищу';

      renderComponent(ctx, {
        items,
        onChange: vi.fn(),
        inputValue,
        input: true,
      });

      expect(getInput(ctx).value).toEqual(inputValue);
    }));

  test('при удалении текста по Backspace он удаляется', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();
      const inputDefaultValue = 'я ищу';

      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        inputDefaultValue,
        input: true,
      });

      getInput(ctx).focus();

      await wrap(userEvent.keyboard('{Backspace}{Backspace}{Backspace}'));

      expect(getInput(ctx).value).not.toEqual(inputDefaultValue);
    }));

  test('disabled - при удалении текста по Backspace он не удаляется', (ctx) =>
    context.start(async () => {
      const onInputChangeMock = vi.fn();
      const inputDefaultValue = 'я ищу';

      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: vi.fn(),
        onInput: onInputChangeMock,
        inputDefaultValue,
        disabled: true,
        input: true,
      });

      getInput(ctx).focus();

      await wrap(userEvent.keyboard('{Backspace}{Backspace}{Backspace}'));

      expect(getInput(ctx).value).toEqual(inputDefaultValue);
    }));

  test('clearButton отображается при выбранном значении', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: vi.fn(),
        clearButton: true,
      });

      expect(getClearButton(ctx)).toBeInTheDocument();
    }));

  test('очищает значение при нажатии на кнопку очистки', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: handleChange,
        clearButton: true,
      });

      await wrap(userEvent.click(getClearButton(ctx)));

      expect(handleChange).toHaveBeenCalledWith(null, {
        e: expect.any(Object),
      });
    }));

  test('очищает значение при нажатии на кнопку Backspace', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: handleChange,
        clearButton: true,
      });

      getInput(ctx).focus();
      await wrap(userEvent.keyboard('{Backspace}'));

      expect(handleChange).toHaveBeenCalledWith(null, {
        e: expect.any(Object),
      });
    }));

  test('disabled - не очищает значение при нажатии на кнопку очистки', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: handleChange,
        clearButton: true,
        disabled: true,
      });

      await wrap(userEvent.click(getClearButton(ctx)));

      expect(handleChange).not.toHaveBeenCalled();
    }));

  test('disabled - не очищает значение при нажатии на кнопку Backspace', (ctx) =>
    context.start(async () => {
      const handleChange = vi.fn();
      renderComponent(ctx, {
        items,
        value: items[0],
        onChange: handleChange,
        clearButton: true,
        disabled: true,
      });

      getInput(ctx).focus();
      await wrap(userEvent.keyboard('{Backspace}'));

      expect(handleChange).not.toHaveBeenCalled();
    }));

  test('группы отображаются', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, {
        items,
        groups,
        value: items[0],
        onChange: vi.fn(),
      });

      await wrap(userEvent.click(getInput(ctx)));

      groups.map((group, index) =>
        expect(getGroups(ctx)[index].textContent).toEqual(group.label),
      );
    }));

  describe.concurrent('проверка dropdownForm', () => {
    (['default', 'brick', 'round'] as const).map((dropdownForm) => {
      test(`dropdownForm = ${dropdownForm}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, dropdownForm, onChange: vi.fn() });

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

          expect(getRender(ctx)).toHaveClass(
            cnFieldControlLayout({ status }).split(' ')[1],
          );
        }));
    });
  });

  test('элементы disabled отображаются с соответствущем классом', (ctx) =>
    context.start(async () => {
      renderComponent(ctx, { items: itemsWithDisabled, onChange: vi.fn() });

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

          inputClick(ctx);

          await wrap(sleep(animateTimeout));
          getItem(ctx, index).click();

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

        inputClick(ctx);

        await wrap(sleep(animateTimeout));

        expect(getLoader(ctx)).toBeInTheDocument();
      }));
    [false, undefined].map((isLoading) => {
      test(`isLoading = ${isLoading}`, (ctx) =>
        context.start(async () => {
          renderComponent(ctx, { items, isLoading, onChange: vi.fn() });

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

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getDropdown(ctx).querySelectorAll('.test')[0]).toBeInTheDocument();
      expect(getDropdown(ctx).querySelectorAll('.test')[0].textContent).toEqual(
        items[0].label,
      );
    }));

  test('проверка renderValue', (ctx) =>
    context.start(async () => {
      const renderValue: SelectPropRenderValue<SelectItemDefault, false> = ({
        value,
      }) => <div className="test">{value.label}</div>;

      renderComponent(ctx, {
        items,
        renderValue,
        value: items[0],
        onChange: vi.fn(),
      });

      inputClick(ctx);

      await wrap(sleep(animateTimeout));

      expect(getRender(ctx)?.querySelector('.test')).toBeInTheDocument();
    }));
});

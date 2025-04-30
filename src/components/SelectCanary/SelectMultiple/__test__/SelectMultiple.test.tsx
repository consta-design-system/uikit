import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { createIconMock } from '##/../__mocks__/IconMock';
import { cnFieldArrayValueInlineControl } from '##/components/FieldComponents';
import { cnFieldControlLayout } from '##/components/FieldComponents/FieldControlLayout';
import { cnListBox, cnListItem, cnListLoader } from '##/components/ListCanary';

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

const testId = 'SelectSingleCanary';
const animationDuration = 200;

const renderComponent = (
  props: SelectProps<SelectItemDefault, SelectGroupDefault, true>,
) => {
  return render(
    <>
      <div data-testid="outside" />
      <SelectMultiple data-testid={testId} multiple {...props} />
    </>,
  );
};

const getRender = () => screen.getByTestId(testId);
const getOutside = () => screen.getByTestId('outside') as HTMLDivElement;
const getInput = () => getRender().querySelector(`input`) as HTMLInputElement;
const inputClick = () => fireEvent.click(getInput());
const animateDelay = () => {
  act(() => {
    jest.advanceTimersByTime(animationDuration);
  });
};
const getDropdown = () => screen.queryByRole('listbox') as HTMLDivElement;
const outsideClick = () => fireEvent.mouseDown(getOutside());
const getValueControl = () =>
  getRender().querySelector(
    `.${cnFieldArrayValueInlineControl()}`,
  ) as HTMLDivElement;
const getItems = () =>
  getDropdown().querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];
const getSelectAllOptions = () =>
  getDropdown().querySelectorAll(
    `.${cnSelectItemAll()}`,
  ) as unknown as HTMLDivElement[];
const getSelectAllOption = (index: number = 0) =>
  getSelectAllOptions()[index] as HTMLDivElement;

const getItem = (index: number = 0) => getItems()[index] as HTMLDivElement;
const getClearButton = () =>
  getRender().querySelector(
    `.${cnSelectControlLayout('ClearButton')}`,
  ) as HTMLButtonElement;
const getLoader = () =>
  getDropdown().querySelector(`.${cnListLoader()}`) as HTMLDivElement;
const getCreateButton = () =>
  getDropdown().querySelector(`.${cnSelectCreateButton()}`) as HTMLDivElement;
const onCreateClick = () => fireEvent.click(getCreateButton());

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

describe('SelectSingle', () => {
  //   const getItemLabel = (item: { id: number; label: string }) => item.label;
  //   const getItemKey = (item: { id: number; label: string }) => item.id;

  it('рендерится без ошибок', () => {
    expect(() => renderComponent({ items, onChange: jest.fn() })).not.toThrow();
  });

  it('отображает плейсхолдер, если значение не выбрано', () => {
    renderComponent({
      items,
      onChange: jest.fn(),
      placeholder: 'Выберите элемент',
    });

    expect(screen.getByPlaceholderText('Выберите элемент')).toBeInTheDocument();
  });

  it('отображает выбранное значение', () => {
    renderComponent({
      items,
      value: [items[1]],
      onChange: jest.fn(),
      placeholder: 'Выберите элемент',
    });

    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('проверка ref', () => {
    const ref = { current: null };
    renderComponent({ items, ref, onChange: jest.fn() });
    expect(ref.current).toBeTruthy();
  });

  it('проверка inputRef', () => {
    const inputRef = { current: null };
    renderComponent({ items, inputRef, onChange: jest.fn() });
    expect(inputRef.current).toBeTruthy();
  });

  it('Присваивается дополнительный className', () => {
    const className = 'custom-class';
    renderComponent({ items, className, onChange: jest.fn() });
    expect(getRender()).toHaveClass(className);
  });

  it('Присваиваются дополнительные атрибуты', () => {
    renderComponent({
      items,
      'onChange': jest.fn(),
      'aria-placeholder': 'test-autocomplete',
    });
    expect(getRender()).toHaveAttribute(
      'aria-placeholder',
      'test-autocomplete',
    );
  });

  it('открывается по клику', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ items, onChange: jest.fn() });
    });

    inputClick();

    animateDelay();

    expect(getDropdown()).toBeInTheDocument();
  });

  it('открывается по клику', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ items, onChange: jest.fn() });
    });

    inputClick();

    animateDelay();

    expect(getDropdown()).toBeInTheDocument();
  });

  it('закрывается по клику вне компонента', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ items, onChange: jest.fn() });
    });

    inputClick();

    animateDelay();

    expect(getDropdown()).toBeInTheDocument();
    outsideClick();
    animateDelay();

    expect(getDropdown()).not.toBeInTheDocument();
  });

  it('Отображаются элементы', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ items, onChange: jest.fn() });
    });

    inputClick();

    animateDelay();

    items.map((item) =>
      expect(screen.getByText(item.label)).toBeInTheDocument(),
    );
  });

  it('не открывается по клику при disabled', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ items, onChange: jest.fn(), disabled: true });
    });

    inputClick();

    animateDelay();

    expect(getDropdown()).not.toBeInTheDocument();
  });

  it('value верно рендерится', () => {
    const value = [items[2]];

    renderComponent({
      items,
      value,
      onChange: jest.fn(),
    });
    expect(getValueControl().textContent).toEqual(value[0].label);
  });

  it('проверка onChange', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    act(() => {
      renderComponent({ items, onChange: onChangeMock });
    });
    inputClick();
    animateDelay();
    fireEvent.click(getItem(0));
    expect(onChangeMock).toHaveBeenCalled();
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith([items[0]], {
      e: expect.any(Object),
    });
  });

  describe('проверка onFocus', () => {
    it('проверка onFocus', () => {
      const handlerFocus = jest.fn();
      renderComponent({ items, onChange: jest.fn(), onFocus: handlerFocus });

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      getInput().focus();

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка onBlur', () => {
    it('проверка onBlur', () => {
      const handlerBlur = jest.fn();
      renderComponent({ items, onChange: jest.fn(), onBlur: handlerBlur });
      getInput().focus();
      expect(handlerBlur).toHaveBeenCalledTimes(0);
      getInput().blur();
      expect(handlerBlur).toHaveBeenCalledTimes(1);
    });
  });

  it('проверка onDropdownOpen', () => {
    const handlerDropdownOpen = jest.fn();
    renderComponent({
      items,
      onChange: jest.fn(),
      onDropdownOpen: handlerDropdownOpen,
    });
    inputClick();

    expect(handlerDropdownOpen).toHaveBeenCalledTimes(2);
    outsideClick();
    expect(handlerDropdownOpen).toHaveBeenCalledTimes(3);
    inputClick();

    expect(handlerDropdownOpen).toHaveBeenCalledTimes(4);
    outsideClick();
    expect(handlerDropdownOpen).toHaveBeenCalledTimes(5);
  });

  it('поддерживает управление с клавиатуры', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    act(() => {
      renderComponent({ items, onChange: onChangeMock });
    });

    const input = getInput();
    fireEvent.focus(input);
    animateDelay();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(getDropdown()).toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    // переход по клавишам работает
    expect(onChangeMock).toHaveBeenCalledWith([items[1]], {
      e: expect.any(Object),
    });

    fireEvent.keyDown(input, { key: 'Escape' });
    animateDelay();
    // закрытие по esc
    expect(getDropdown()).not.toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Enter' });
    animateDelay();
    // открытие по enter
    expect(getDropdown()).toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Tab' });
    animateDelay();
    // закрытие по tab
    expect(getDropdown()).not.toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'Tab' });

    // снятие фокуса по tab
    expect(input).not.toHaveFocus();
  });

  it('disable - управление с клавиатуры не работает', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    act(() => {
      renderComponent({ items, onChange: onChangeMock, disabled: true });
    });

    const input = getInput();
    fireEvent.focus(input);
    animateDelay();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(getDropdown()).not.toBeInTheDocument();
    expect(input).not.toHaveFocus();

    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(getDropdown()).not.toBeInTheDocument();
    expect(input).not.toHaveFocus();

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(getDropdown()).not.toBeInTheDocument();
    expect(input).not.toHaveFocus();
  });

  it('имеется возможность вводить текст в input', () => {
    const onInputChangeMock = jest.fn();

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      input: true,
    });

    const input = getInput();

    fireEvent.change(input, { target: { value: 'change' } });

    expect(input.value).toEqual('change');
  });

  it('имеется возможность вводить текст в input', () => {
    const onInputChangeMock = jest.fn();

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      input: true,
    });

    const input = getInput();

    fireEvent.change(input, { target: { value: 'change' } });

    expect(input.value).toEqual('change');
    expect(onInputChangeMock).toHaveBeenCalledWith('change');
  });

  it('при вводе текста в input срабатывает onInput', () => {
    const onInputChangeMock = jest.fn();

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      input: true,
    });

    fireEvent.change(getInput(), { target: { value: 'change' } });

    expect(onInputChangeMock).toHaveBeenCalledTimes(1);
    expect(onInputChangeMock).toHaveBeenCalledWith('change');
  });

  it('disabled - при вводе текста в input не срабатывает onInput', () => {
    const onInputChangeMock = jest.fn();

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      disabled: true,
      input: true,
    });

    fireEvent.change(getInput(), { target: { value: 'change' } });

    expect(onInputChangeMock).not.toHaveBeenCalled();
  });

  it('отображается inputValue', () => {
    const onInputChangeMock = jest.fn();
    const inputValue = 'я ищу';

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      inputValue,
      input: true,
    });

    expect(getInput().value).toEqual(inputValue);
  });

  it('отображается inputDefaultValue', () => {
    const inputDefaultValue = 'я ищу';

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      inputDefaultValue,
      input: true,
    });

    expect(getInput().value).toEqual(inputDefaultValue);
  });

  it('disabled - при удалении текста по Backspace он не удаляется', () => {
    const onInputChangeMock = jest.fn();
    const inputValue = 'я ищу';

    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      inputValue,
      disabled: true,
      input: true,
    });

    fireEvent.keyDown(getInput(), { key: 'Backspace' });
    fireEvent.keyDown(getInput(), { key: 'Backspace' });
    fireEvent.keyDown(getInput(), { key: 'Backspace' });

    expect(getInput().value).toEqual(inputValue);
  });

  it('clearButton отображается при выбранном значении', () => {
    renderComponent({
      items,
      value: [items[0]],
      onChange: jest.fn(),
      clearButton: true,
    });

    const clearButton = getClearButton();

    expect(clearButton).toBeInTheDocument();
  });

  it('очищает значение при нажатии на кнопку очистки', () => {
    const handleChange = jest.fn();
    renderComponent({
      items,
      value: [items[0]],
      onChange: handleChange,
      clearButton: true,
    });

    const clearButton = getClearButton();
    fireEvent.click(clearButton);

    expect(handleChange).toHaveBeenCalledWith(null, {
      e: expect.any(Object),
    });
  });

  it('очищает значение при нажатии на кнопку Backspace', () => {
    const handleChange = jest.fn();
    renderComponent({
      items,
      value: [items[0]],
      onChange: handleChange,
      clearButton: true,
    });

    fireEvent.keyDown(getInput(), { key: 'Backspace' });

    expect(handleChange).toHaveBeenCalledWith(null, {
      e: expect.any(Object),
    });
  });

  it('disabled - не очищает значение при нажатии на кнопку очистки', () => {
    const handleChange = jest.fn();
    renderComponent({
      items,
      value: [items[0]],
      onChange: handleChange,
      clearButton: true,
      disabled: true,
    });

    const clearButton = getClearButton();
    fireEvent.click(clearButton);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disabled - не очищает значение при нажатии на кнопку Backspace', () => {
    const handleChange = jest.fn();
    renderComponent({
      items,
      value: [items[0]],
      onChange: handleChange,
      clearButton: true,
      disabled: true,
    });

    fireEvent.keyDown(getInput(), { key: 'Backspace' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('disabled - не очищает значение при нажатии на кнопку Backspace', () => {
    const handleChange = jest.fn();
    renderComponent({
      items,
      value: [items[0]],
      onChange: handleChange,
      clearButton: true,
      disabled: true,
    });

    fireEvent.keyDown(getInput(), { key: 'Backspace' });

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('группы отображаются', () => {
    renderComponent({
      items,
      groups,
      value: [items[0]],
      onChange: jest.fn(),
    });

    inputClick();
    animateDelay();
    groups.map((group) =>
      expect(screen.getByText(group.label)).toBeInTheDocument(),
    );
  });

  describe('проверка dropdownForm', () => {
    (['default', 'brick', 'round'] as const).map((dropdownForm) => {
      it(`dropdownForm = ${dropdownForm}`, () => {
        jest.useFakeTimers();

        act(() => {
          renderComponent({ items, dropdownForm, onChange: jest.fn() });
        });
        inputClick();
        animateDelay();
        expect(getDropdown()).toHaveClass(
          cnListBox({ form: dropdownForm }).split(' ')[1],
        );
      });
    });
  });

  describe('проверка form', () => {
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
      it(`form = ${form}`, () => {
        renderComponent({ items, form, onChange: jest.fn() });

        expect(getRender()).toHaveClass(
          cnFieldControlLayout({ form }).split(' ')[1],
        );
      });
    });
  });

  describe('проверка view', () => {
    (['default', 'clear'] as const).map((view) => {
      it(`view = ${view}`, () => {
        renderComponent({ items, view, onChange: jest.fn() });

        expect(getRender()).toHaveClass(
          cnFieldControlLayout({ view }).split(' ')[1],
        );
      });
    });
  });

  describe('проверка status', () => {
    (['alert', 'success', 'warning'] as const).map((status) => {
      it(`status = ${status}`, () => {
        renderComponent({ items, status, onChange: jest.fn() });

        expect(getRender()).toHaveClass(
          cnFieldControlLayout({ status }).split(' ')[1],
        );
      });
    });
  });

  it('элементы disabled отображаются с соответствущем классом', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({ items: itemsWithDisabled, onChange: jest.fn() });
    });

    inputClick();

    animateDelay();

    itemsWithDisabled.map((item, index) => {
      if (item.disabled) {
        expect(getItem(index)).toHaveClass(
          cnListItem({ disabled: true }).split(' ')[1],
        );
      } else {
        expect(getItem(index)).not.toHaveClass(
          cnListItem({ disabled: true }).split(' ')[1],
        );
      }
    });
  });

  describe('по элементам disabled не отрабатывает onChange', () => {
    itemsWithDisabled.map((item, index) => {
      it(`item ${index} disabled = ${item.disabled}`, () => {
        jest.useFakeTimers();
        const handleChange = jest.fn();
        act(() => {
          renderComponent({ items: itemsWithDisabled, onChange: handleChange });
        });

        inputClick();

        animateDelay();
        fireEvent.click(getItem(index));
        if (item.disabled) {
          expect(handleChange).not.toHaveBeenCalled();
        } else {
          expect(handleChange).toHaveBeenCalled();
        }
      });
    });
  });

  describe('проверка isLoading', () => {
    it('isLoading = true', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponent({ items, isLoading: true, onChange: jest.fn() });
      });

      inputClick();

      animateDelay();

      expect(getLoader()).toBeInTheDocument();
    });
    [false, undefined].map((isLoading) => {
      it(`isLoading = ${isLoading}`, () => {
        jest.useFakeTimers();
        act(() => {
          renderComponent({ items, isLoading, onChange: jest.fn() });
        });

        inputClick();

        animateDelay();

        expect(getLoader()).not.toBeInTheDocument();
      });
    });
  });

  it('проверка onCreate', () => {
    jest.useFakeTimers();
    const onCreate = jest.fn();
    const inputValue = 'test';
    act(() => {
      renderComponent({ items, onCreate, inputValue, onChange: jest.fn() });
    });

    inputClick();

    animateDelay();

    expect(getCreateButton()).toBeInTheDocument();

    onCreateClick();

    expect(onCreate).toHaveBeenCalled();
    expect(onCreate).toHaveBeenCalledWith(inputValue, {
      e: expect.any(Object),
    });
  });

  it('проверка labelForCreate', () => {
    jest.useFakeTimers();
    const labelForCreate = 'Создать';
    act(() => {
      renderComponent({
        items,
        labelForCreate,
        onCreate: jest.fn(),
        onChange: jest.fn(),
      });
    });

    inputClick();

    animateDelay();

    expect(getCreateButton()).toBeInTheDocument();
  });

  it('проверка iconClear', () => {
    jest.useFakeTimers();
    const iconClear = createIconMock('iconClear');
    act(() => {
      renderComponent({
        items,
        iconClear,
        clearButton: true,
        inputValue: 'test',
        onCreate: jest.fn(),
        onChange: jest.fn(),
      });
    });

    inputClick();

    animateDelay();

    expect(getClearButton().textContent).toEqual('iconClear');
  });

  // тестирование renderItem
  it('проверка renderItem', () => {
    jest.useFakeTimers();
    const renderItem: SelectPropRenderItem<SelectItemDefault> = ({ item }) => (
      <div className="test">{item.label}</div>
    );
    act(() => {
      renderComponent({
        items,
        renderItem,
        onChange: jest.fn(),
      });
    });

    inputClick();

    animateDelay();

    expect(getDropdown().querySelectorAll('.test')[0]).toBeInTheDocument();
    expect(getDropdown().querySelectorAll('.test')[0].textContent).toEqual(
      items[0].label,
    );
  });

  it('проверка renderValue', () => {
    jest.useFakeTimers();
    const renderValue: SelectPropRenderValue<SelectItemDefault, true> = ({
      value,
    }) => (
      <>
        {value.map((item) => (
          <div className="test">{item.label}</div>
        ))}
      </>
    );

    act(() => {
      renderComponent({
        items,
        renderValue,
        value: [items[0]],
        onChange: jest.fn(),
      });
    });

    inputClick();

    animateDelay();

    expect(getValueControl().querySelector('.test')).toBeInTheDocument();
  });

  it('проверка selectAll', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();

    act(() => {
      renderComponent({
        items,
        selectAll: true,
        onChange: onChangeMock,
      });
    });

    inputClick();

    animateDelay();

    const item = getItem(0);

    expect(item).toHaveTextContent('Выбрать все');
    expect(item).toHaveClass(cnSelectItemAll());

    // получить элемент selectAl
  });

  it('проверка selectAll в группе', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();

    act(() => {
      renderComponent({
        items,
        value: items,
        groups,
        selectAll: true,
        onChange: onChangeMock,
      });
    });

    inputClick();

    animateDelay();

    expect(getSelectAllOptions().length).toEqual(2);
  });

  it('проверка selectAllLabel', () => {
    jest.useFakeTimers();
    const onChangeMock = jest.fn();
    const selectAllLabel = 'Все';

    act(() => {
      renderComponent({
        items,
        selectAll: true,
        onChange: onChangeMock,
        selectAllLabel,
      });
    });

    inputClick();

    animateDelay();

    const item = getItem(0);
    expect(item).toHaveTextContent(selectAllLabel);
    expect(item).toHaveClass(cnSelectItemAll());
  });

  describe('проверка клика selectAll', () => {
    it('если не выбрано то выбирает все', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();

      act(() => {
        renderComponent({
          items,
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getItem(0);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith(items, {
        e: expect.any(Object),
      });
    });
    it('если выбран хотя бы 1  выбрано то выбирает все', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();

      act(() => {
        renderComponent({
          items,
          value: [items[0]],
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getItem(0);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith(items, {
        e: expect.any(Object),
      });
    });
    it('если выбраны все то отменяет все выборы', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();

      act(() => {
        renderComponent({
          items,
          value: items,
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getItem(0);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith([], {
        e: expect.any(Object),
      });
    });
    it('c группами, если не выбрано то выбирает все в группе', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      const testingGroupIndex = 0;

      act(() => {
        renderComponent({
          items,
          groups,
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getSelectAllOption(testingGroupIndex);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith(
        items.filter((item) => item.groupId === groups[testingGroupIndex].id),
        {
          e: expect.any(Object),
        },
      );
    });

    it('c группами, если не выбрано то выбирает все в группе', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      const testingGroupIndex = 0;

      act(() => {
        renderComponent({
          items,
          groups,
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getSelectAllOption(testingGroupIndex);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith(
        items.filter((item) => item.groupId === groups[testingGroupIndex].id),
        {
          e: expect.any(Object),
        },
      );
    });

    it('c группами, если выбран хотя бы 1 то выбирает все в группе', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      const testingGroupIndex = 0;

      act(() => {
        renderComponent({
          items,
          groups,
          value: [
            items.filter(
              (item) => item.groupId === groups[testingGroupIndex].id,
            )[0],
          ],
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getSelectAllOption(testingGroupIndex);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith(
        items.filter((item) => item.groupId === groups[testingGroupIndex].id),
        {
          e: expect.any(Object),
        },
      );
    });

    it('c группами, если выбраны все то отменяет все выборы в группе', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      const testingGroupIndex = 0;

      act(() => {
        renderComponent({
          items,
          groups,
          value: items.filter(
            (item) => item.groupId === groups[testingGroupIndex].id,
          ),
          selectAll: true,
          onChange: onChangeMock,
        });
      });

      inputClick();

      animateDelay();

      const item = getSelectAllOption(testingGroupIndex);

      expect(item).toHaveTextContent('Выбрать все');
      expect(item).toHaveClass(cnSelectItemAll());

      fireEvent.click(item);
      expect(onChangeMock).toHaveBeenCalledWith([], {
        e: expect.any(Object),
      });
    });
  });
});

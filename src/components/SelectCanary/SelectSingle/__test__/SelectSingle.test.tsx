import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';

import {
  SelectComponent,
  SelectGroupDefault,
  SelectItemDefault,
  SelectProps,
  SelectSingle,
} from '../..';
import { cnSelectControlLayout } from '../../SelectControlLayout';
import { cnSelectInput } from '../../SelectInput';

const testId = 'SelectSingleCanary';
const animationDuration = 200;

const renderComponent = (
  props: SelectProps<SelectItemDefault, SelectGroupDefault, false>,
) => {
  return render(
    <>
      <div data-testid="outside" />
      <SelectSingle data-testid={testId} {...props} />
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
const getValueText = () =>
  getRender().querySelector(`.${cnSelectInput('ValueText')}`) as HTMLDivElement;
const getItems = () =>
  getDropdown().querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];

const getItem = (index: number = 0) => getItems()[index] as HTMLDivElement;
const getClearButton = () =>
  getRender().querySelector(
    `.${cnSelectControlLayout('ClearButton')}`,
  ) as HTMLButtonElement;

const items: SelectItemDefault[] = [
  { id: 1, label: 'Item 1', groupId: 1 },
  { id: 2, label: 'Item 2', groupId: 1 },
  { id: 3, label: 'Item 3', groupId: 2 },
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
      value: items[1],
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
    const value = items[2];

    renderComponent({
      items,
      value,
      onChange: jest.fn(),
    });
    expect(getValueText().textContent).toEqual(value.label);
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
    expect(onChangeMock).toHaveBeenCalledWith(items[0], {
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
    expect(onChangeMock).toHaveBeenCalledWith(items[1], {
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
      onChange: jest.fn(),
      onInput: onInputChangeMock,
      inputValue,
      input: true,
    });

    expect(getInput().value).toEqual(inputValue);
  });

  it('disabled - при удалении текста по Backspace он не удаляется', () => {
    const onInputChangeMock = jest.fn();
    const inputValue = 'я ищу';

    renderComponent({
      items,
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
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
      value: items[0],
      onChange: jest.fn(),
    });

    inputClick();
    animateDelay();
    groups.map((group) =>
      expect(screen.getByText(group.label)).toBeInTheDocument(),
    );

    // expect(handleChange).not.toHaveBeenCalled();
  });

  // проверка задизебленных элементов

  //   it('открывает выпадающий список при клике', () => {
  //     render(
  //       <SelectSingle
  //         items={items}
  //         value={null}
  //         // getItemLabel={getItemLabel}
  //         // getItemKey={getItemKey}
  //         onChange={jest.fn()}
  //       />,
  //     );

  //     const input = screen.getByPlaceholderText('Выберите элемент');
  //     fireEvent.click(input);

  //     expect(screen.getByText('Item 1')).toBeInTheDocument();
  //     expect(screen.getByText('Item 2')).toBeInTheDocument();
  //     expect(screen.getByText('Item 3')).toBeInTheDocument();
  //   });

  //   it('вызывает onChange при выборе элемента', () => {
  //     const handleChange = jest.fn();
  //     render(
  //       <SelectSingle
  //         items={items}
  //         value={null}
  //         // getItemLabel={getItemLabel}
  //         // getItemKey={getItemKey}
  //         onChange={handleChange}
  //       />,
  //     );

  //     const input = screen.getByPlaceholderText('Выберите элемент');
  //     fireEvent.click(input);

  //     const item = screen.getByText('Item 1');
  //     fireEvent.click(item);

  //     expect(handleChange).toHaveBeenCalledWith(items[0]);
  //   });

  //   it('очищает значение при нажатии на кнопку очистки', () => {
  //     const handleChange = jest.fn();
  //     render(
  //       <SelectSingle
  //         items={items}
  //         value={items[0]}
  //         getItemLabel={getItemLabel}
  //         getItemKey={getItemKey}
  //         onChange={handleChange}
  //         clearButton
  //       />,
  //     );

  //     const clearButton = screen.getByLabelText('Очистить');
  //     fireEvent.click(clearButton);

  //     expect(handleChange).toHaveBeenCalledWith(null);
  //   });

  //   it('не вызывает onChange, если компонент отключен', () => {
  //     const handleChange = jest.fn();
  //     render(
  //       <SelectSingle
  //         items={items}
  //         value={null}
  //         getItemLabel={getItemLabel}
  //         getItemKey={getItemKey}
  //         onChange={handleChange}
  //         disabled
  //       />,
  //     );

  //     const input = screen.getByPlaceholderText('Выберите элемент');
  //     fireEvent.click(input);

  //     expect(handleChange).not.toHaveBeenCalled();
  //   });
});

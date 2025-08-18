import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
} from '@testing-library/react';
import React from 'react';

import { cnListGroupLabel, cnListItem } from '##/components/ListCanary';
import { cnListBox } from '##/components/ListCanary/ListBox';
import { cnLoader } from '##/components/LoaderDeprecated';
import { DefaultItem } from '##/components/SelectDeprecated';
import { TextFieldPropRenderValueItem } from '##/components/TextFieldCanary/types';

import { AutoComplete, cnAutoComplete } from '../AutoCompleteCanary';
import {
  AutoCompleteGroupDefault,
  AutoCompleteItemDefault,
  AutoCompletePropRenderItem,
  AutoCompleteProps,
} from '../types';

type AutoCompleteTestComponent<
  TYPE extends string = string,
  ITEM = AutoCompleteItemDefault,
  GROUP = AutoCompleteGroupDefault,
> = (props: AutoCompleteProps<TYPE, ITEM, GROUP>) => RenderResult;

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
const animationDuration = 200;

const defaultProps = { items };

const renderComponent: AutoCompleteTestComponent<string> = (props) => {
  return render(
    <>
      <div data-testid="outside" />
      <AutoComplete data-testid={testId} {...props} />
    </>,
  );
};

const renderComponentTextArray: AutoCompleteTestComponent<'textarray'> = (
  props,
) => {
  return render(
    <>
      <div data-testid="outside" />
      <AutoComplete data-testid={testId} {...props} />
    </>,
  );
};

const getRender = () => screen.getByTestId(testId);
const getOutside = () => screen.getByTestId('outside') as HTMLDivElement;
const getDropdown = () => screen.queryByRole('listbox') as HTMLDivElement;
const getLoader = () =>
  getDropdown().querySelector(`.${cnLoader()}`) as HTMLDivElement;

const getInput = () =>
  getRender().querySelector(`input[type="text"]`) as HTMLInputElement;
const getItems = () =>
  getDropdown().querySelectorAll(
    `.${cnListItem()}`,
  ) as unknown as HTMLDivElement[];
const getItem = (index: number = 0) => getItems()[index] as HTMLDivElement;

const animateDelay = () => {
  act(() => {
    jest.advanceTimersByTime(animationDuration);
  });
};
const getGroups = () =>
  getDropdown().querySelectorAll(`.${cnListGroupLabel()}`);
const getGroup = (index: number = 0) => getGroups()[index] as HTMLDivElement;
const inputClick = () => fireEvent.click(getInput());
const outsideClick = () => fireEvent.mouseDown(getOutside());

describe(`Компонент ${testId}`, () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent(defaultProps)).not.toThrow();
  });

  describe('проверка type', () => {
    it('рендерит AutoCompleteTypeText по умолчанию', () => {
      renderComponent(defaultProps);
      expect(getRender()).toHaveClass(cnAutoComplete({ type: 'text' }));
    });

    it('рендерит AutoCompleteTypeText при type="text"', () => {
      renderComponent({ ...defaultProps, type: 'text' });
      expect(getRender()).toHaveClass(cnAutoComplete({ type: 'text' }));
    });

    it('рендерит AutoCompleteTypeTextArray при type="textarray"', () => {
      renderComponentTextArray({
        ...defaultProps,
        type: 'textarray',
      });
      expect(getRender()).toHaveClass(cnAutoComplete({ type: 'textarray' }));
    });
  });

  describe('проверка ref', () => {
    it('ref присвоен', () => {
      const ref = { current: null };
      renderComponent({ ...defaultProps, ref });
      expect(ref.current).toBeTruthy();
    });
  });

  describe('проверка className', () => {
    it('Присваивается дополнительный className', () => {
      const className = 'custom-class';
      renderComponent({ ...defaultProps, className });
      expect(getRender()).toHaveClass(className);
    });
  });

  describe('проверка other props', () => {
    it('Присваиваются дополнительные атрибуты', () => {
      renderComponent({
        ...defaultProps,
        'aria-label': 'test-autocomplete',
      });
      expect(getRender()).toHaveAttribute('aria-label', 'test-autocomplete');
    });
  });

  describe('рендерит элементы items', () => {
    it('рендерит элементы items для типа text', () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          ...defaultProps,
          type: 'text',
          value: 'item',
        });
      });

      const input = getInput();

      fireEvent.focus(input);

      animateDelay();

      items.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });

    it('рендерит элементы items для типа textarray', () => {
      jest.useFakeTimers();

      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          inputValue: 'item',
        });
      });

      const input = getInput();

      fireEvent.focus(input);

      animateDelay();

      items.forEach((item) => {
        expect(screen.getByText(item.label)).toBeInTheDocument();
      });
    });
  });

  describe('рендерит группы', () => {
    it('рендерит группы', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponent({ ...defaultProps, groups, value: 'item' });
      });

      inputClick();
      animateDelay();
      expect(getGroups().length).toEqual(groups.length);
    });

    it('рендерит группы  для типа textarray', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          groups,
          inputValue: 'item',
        });
      });

      inputClick();
      animateDelay();
      expect(getGroups().length).toEqual(groups.length);
    });
  });

  describe('открывается по клику', () => {
    it('открывается по клику', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponent({ ...defaultProps, value: 'item' });
      });

      inputClick();

      animateDelay();

      expect(getDropdown()).toBeInTheDocument();
    });
    it('открывается по клику при type=textarray', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          inputValue: 'item',
        });
      });

      inputClick();

      animateDelay();

      expect(getDropdown()).toBeInTheDocument();
    });
  });

  describe('закрывается по клику вне компонента', () => {
    it('закрывается по клику вне компонента', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponent({ ...defaultProps, value: 'item' });
      });

      inputClick();

      animateDelay();

      expect(getDropdown()).toBeInTheDocument();
      outsideClick();
      animateDelay();

      expect(getDropdown()).not.toBeInTheDocument();
    });
    it('закрывается по клику вне компонента при type=textarray', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          inputValue: 'item',
        });
      });

      inputClick();

      animateDelay();

      expect(getDropdown()).toBeInTheDocument();
      outsideClick();
      animateDelay();

      expect(getDropdown()).not.toBeInTheDocument();
    });
  });

  describe('проверка onChange', () => {
    it('проверка onChange', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      act(() => {
        renderComponent({
          ...defaultProps,
          onChange: onChangeMock,
          value: 'item',
        });
      });
      const input = getInput();
      fireEvent.focus(input);
      animateDelay();
      fireEvent.click(screen.getByText(items[0].label));
      expect(onChangeMock).toHaveBeenCalled();
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith(items[0].label, {
        e: expect.any(Object),
      });
    });
  });

  describe('проверка onFocus', () => {
    it('проверка onFocus', () => {
      const handlerFocus = jest.fn();
      renderComponent({ ...defaultProps, onFocus: handlerFocus });

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      getInput().focus();

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    });
    it('проверка onFocus при type=textarray', () => {
      const handlerFocus = jest.fn();
      renderComponentTextArray({
        ...defaultProps,
        type: 'textarray',
        onFocus: handlerFocus,
        inputValue: 'item',
      });

      expect(handlerFocus).toHaveBeenCalledTimes(0);

      getInput().focus();

      expect(handlerFocus).toHaveBeenCalledTimes(1);
    });
  });
  describe('проверка onBlur', () => {
    it('проверка onBlur', () => {
      const handlerBlur = jest.fn();
      renderComponent({ ...defaultProps, onBlur: handlerBlur });
      getInput().focus();
      expect(handlerBlur).toHaveBeenCalledTimes(0);
      getInput().blur();
      expect(handlerBlur).toHaveBeenCalledTimes(1);
    });
    it('проверка onBlur при type=textarray', () => {
      const handlerBlur = jest.fn();
      renderComponentTextArray({
        ...defaultProps,
        type: 'textarray',
        onBlur: handlerBlur,
        inputValue: 'item',
      });
      getInput().focus();
      expect(handlerBlur).toHaveBeenCalledTimes(0);
      getInput().blur();
      expect(handlerBlur).toHaveBeenCalledTimes(1);
    });
  });
  describe('проверка onDropdownOpen', () => {
    it('проверка onDropdownOpen', () => {
      const handlerDropdownOpen = jest.fn();
      renderComponent({
        ...defaultProps,
        onDropdownOpen: handlerDropdownOpen,
        items,
        value: 'item',
      });
      const input = getInput();
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(1);
      fireEvent.focus(input);
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(2);
      outsideClick();
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(3);
      fireEvent.focus(input);
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(4);
      outsideClick();
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(5);
    });
    it('проверка onDropdownOpen при type=textarray', () => {
      const handlerDropdownOpen = jest.fn();
      renderComponentTextArray({
        ...defaultProps,
        type: 'textarray',
        onDropdownOpen: handlerDropdownOpen,
        inputValue: 'item',
        items,
      });
      const input = getInput();
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(1);
      fireEvent.focus(input);
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(2);
      outsideClick();
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(3);
      fireEvent.focus(input);
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(4);
      outsideClick();
      expect(handlerDropdownOpen).toHaveBeenCalledTimes(5);
    });
  });
  describe('поддерживает управление с клавиатуры', () => {
    it('поддерживает управление с клавиатуры', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      act(() => {
        renderComponent({
          ...defaultProps,
          onChange: onChangeMock,
          value: 'item',
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      // переход по клавишам работает
      expect(onChangeMock).toHaveBeenCalledWith(items[1].label, {
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

    it('поддерживает управление с клавиатуры при type = textarray', () => {
      jest.useFakeTimers();
      const onChangeMock = jest.fn();
      const onInputChangeMock = jest.fn();
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          inputValue: 'item',
          type: 'textarray',
          onChange: onChangeMock,
          onInputChange: onInputChangeMock,
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });

      // переход по клавишам работает
      expect(onInputChangeMock).toHaveBeenCalledWith(items[1].label, {
        e: expect.any(Object),
      });

      fireEvent.keyDown(input, { key: 'Escape' });
      animateDelay();
      // закрытие по esc
      expect(getDropdown()).not.toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'Enter' });
      animateDelay();
      // onChangeMock по enter
      expect(onChangeMock).toHaveBeenCalledWith(['item'], {
        e: expect.any(Object),
      });

      fireEvent.keyDown(input, { key: 'Tab' });
      animateDelay();
      // закрытие по tab
      expect(getDropdown()).not.toBeInTheDocument();

      fireEvent.keyDown(input, { key: 'Tab' });

      // снятие фокуса по tab
      expect(input).not.toHaveFocus();
    });
  });

  describe('не отображает выпадающий в следующих кейсах', () => {
    it('не отображает выпадающий список при пустом значении', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponent({ ...defaultProps, value: '' });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      expect(getDropdown()).not.toBeInTheDocument();
    });

    it('не отображает выпадающий список при пустом массиве items', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponent({ value: 'item', items: [] });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      expect(getDropdown()).not.toBeInTheDocument();
    });

    it('не отображает выпадающий список при пустом массиве items и type=textarray', () => {
      jest.useFakeTimers();
      act(() => {
        renderComponentTextArray({
          inputValue: 'item',
          type: 'textarray',
          items: [],
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      expect(getDropdown()).not.toBeInTheDocument();
    });
  });

  it('проверка onInputChange', () => {
    jest.useFakeTimers();
    const onInputChangeMock = jest.fn();
    act(() => {
      renderComponentTextArray({
        ...defaultProps,
        onInputChange: onInputChangeMock,
        inputValue: 'item',
        type: 'textarray',
      });
    });

    const input = getInput();
    fireEvent.focus(input);
    animateDelay();
    const item = getItem(0);
    fireEvent.click(item);

    expect(onInputChangeMock).toHaveBeenCalledWith('Item 1', {
      e: expect.any(Object),
    });

    fireEvent.change(input, { target: { value: 'change' } });

    expect(onInputChangeMock).toHaveBeenCalledWith('change', {
      e: expect.any(Object),
    });
  });

  describe('проверка renderItem', () => {
    it('проверка renderItem', () => {
      const cn = 'custom-class';
      const renderItem: AutoCompletePropRenderItem<DefaultItem> = ({
        item,
      }) => (
        <div className="custom-class">
          {item.label} - {item.id}
        </div>
      );
      const item = items[0];
      act(() => {
        renderComponent({
          ...defaultProps,
          renderItem,
          value: item.label,
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      expect(getDropdown().querySelectorAll(`.${cn}`)[0]).toBeInTheDocument();
    });

    it('проверка renderItem для textarray', () => {
      const cn = 'custom-class';
      const renderItem: AutoCompletePropRenderItem<DefaultItem> = ({
        item,
      }) => (
        <div className="custom-class">
          {item.label} - {item.id}
        </div>
      );
      const item = items[0];
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          renderItem,
          inputValue: item.label,
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      expect(getDropdown().querySelectorAll(`.${cn}`)[0]).toBeInTheDocument();
    });
  });

  describe('проверка renderValueItem', () => {
    it('проверка renderValueItem для textarray', () => {
      const cn = 'custom-class';
      const renderValueItem: TextFieldPropRenderValueItem = ({
        item,
        index,
      }) => (
        <div className="custom-class">
          {item} - {index}
        </div>
      );
      const item = items[0];
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          renderValueItem,
          value: [item.label],
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      animateDelay();

      expect(getRender().querySelectorAll(`.${cn}`)[0]).toBeInTheDocument();
    });
  });

  describe('проверка dropdownClassName', () => {
    it('проверка dropdownClassName', () => {
      const className = 'custom-class';
      act(() => {
        renderComponent({
          ...defaultProps,
          dropdownClassName: className,
          value: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();
      expect(getDropdown()).toHaveClass(className);
    });

    it('проверка dropdownClassName при type=textarray', () => {
      const className = 'custom-class';
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          dropdownClassName: className,
          inputValue: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();
      expect(getDropdown()).toHaveClass(className);
    });
  });

  describe('проверка dropdownForm', () => {
    describe('проверка dropdownForm', () => {
      (['default', 'round', 'brick'] as const).forEach((dropdownForm) => {
        it(`проверка dropdownForm=${dropdownForm}`, () => {
          act(() => {
            renderComponent({
              ...defaultProps,
              dropdownForm,
              value: 'item',
            });
          });

          fireEvent.focus(getInput());
          animateDelay();

          expect(getDropdown()).toHaveClass(
            cnListBox({ form: dropdownForm }).split(' ')[1],
          );
        });
      });
    });
    describe('проверка dropdownForm при type=textarray', () => {
      (['default', 'round', 'brick'] as const).forEach((dropdownForm) => {
        it(`проверка dropdownForm=${dropdownForm}`, () => {
          act(() => {
            renderComponentTextArray({
              ...defaultProps,
              dropdownForm,
              type: 'textarray',
              inputValue: 'item',
            });
          });

          fireEvent.focus(getInput());
          animateDelay();

          expect(getDropdown()).toHaveClass(
            cnListBox({ form: dropdownForm }).split(' ')[1],
          );
        });
      });
    });
  });

  describe('проверка isLoading', () => {
    it('проверка isLoading при пустом списке', () => {
      act(() => {
        renderComponent({
          items: [],
          isLoading: true,
          value: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getLoader()).toBeInTheDocument();
    });
    it('проверка isLoading со списком', () => {
      act(() => {
        renderComponent({
          ...defaultProps,
          isLoading: true,
          value: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getLoader()).toBeInTheDocument();
    });

    it('проверка isLoading при пустом списке и при type=textarray', () => {
      act(() => {
        renderComponentTextArray({
          items: [],
          type: 'textarray',
          isLoading: true,
          inputValue: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getLoader()).toBeInTheDocument();
    });
    it('проверка isLoading со списком при type=textarray', () => {
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          isLoading: true,
          inputValue: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getLoader()).toBeInTheDocument();
    });
  });
  describe('проверка searchFunction', () => {
    it('проверка searchFunction', () => {
      const searchFunction = jest.fn(() => true);
      act(() => {
        renderComponent({
          ...defaultProps,
          searchFunction,
          value: 'item',
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'item 1' } });
      animateDelay();

      expect(searchFunction).toHaveBeenCalled();
      expect(getItems().length).toEqual(items.length);
    });
    it('проверка searchFunction при type=textarray', () => {
      const searchFunction = jest.fn(() => true);
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          searchFunction,
          inputValue: 'item',
        });
      });

      const input = getInput();
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'item 1' } });
      animateDelay();

      expect(searchFunction).toHaveBeenCalled();
      expect(getItems().length).toEqual(items.length);
    });
  });
  describe('проверка dropdownRef', () => {
    it('проверка dropdownRef', () => {
      const dropdownRef = { current: null };

      act(() => {
        renderComponent({
          ...defaultProps,
          dropdownRef,
          value: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(dropdownRef.current).toBeTruthy();
    });
    it('проверка dropdownRef при type=textarray', () => {
      const dropdownRef = { current: null };

      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          inputValue: 'item',
          dropdownRef,
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(dropdownRef.current).toBeTruthy();
    });
  });
  describe('проверка getItemLabel', () => {
    it('проверка getItemLabel', () => {
      const getItemLabel = (item: AutoCompleteItemDefault) =>
        item.id.toString();
      act(() => {
        renderComponent({
          ...defaultProps,
          getItemLabel,
          value: '1',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getItem(0).textContent).toEqual(items[0].id.toString());
    });
    it('проверка getItemLabel при type=textarray', () => {
      const getItemLabel = (item: AutoCompleteItemDefault) =>
        item.id.toString();
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          inputValue: '1',
          getItemLabel,
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getItem(0).textContent).toEqual(items[0].id.toString());
    });
  });
  describe('проверка getGroupLabel', () => {
    it('проверка getGroupLabel', () => {
      const getGroupLabel = (item: AutoCompleteGroupDefault) =>
        item.id.toString();
      act(() => {
        renderComponent({
          ...defaultProps,
          groups,
          getGroupLabel,
          value: 'item',
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getGroup(0).textContent).toEqual(groups[0].id.toString());
    });
    it('проверка getGroupLabel при type=textarray', () => {
      const getGroupLabel = (item: AutoCompleteGroupDefault) =>
        item.id.toString();
      act(() => {
        renderComponentTextArray({
          ...defaultProps,
          type: 'textarray',
          groups,
          inputValue: 'item',
          getGroupLabel,
        });
      });

      fireEvent.focus(getInput());
      animateDelay();

      expect(getGroup(0).textContent).toEqual(groups[0].id.toString());
    });
  });
});

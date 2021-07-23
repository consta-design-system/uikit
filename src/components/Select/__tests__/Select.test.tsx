import * as React from 'react';
import { act, fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { groups, items } from '../__mocks__/data.mock';
import { cn } from '../../../utils/bem';
import { cnSelect } from '../../SelectComponents/cnSelect';
import { cnSelectGroupLabel } from '../../SelectComponents/SelectGroupLabel/SelectGroupLabel';
import { cnSelectItem } from '../../SelectComponents/SelectItem/SelectItem';
import { defaultGetItemLabel, Select, SelectProps } from '../Select';

const animationDuration = 200;
const testId = 'Select';
const cnRenderValue = cn('RenderValue');
const cnRenderItem = cn('RenderItem');

const defaultProps: SelectProps = {
  items,
  groups,
  value: null,
  onChange: jest.fn(),
  ariaLabel: 'test-select',
};

const renderComponent = (props: SelectProps = defaultProps): RenderResult => {
  const { items, onChange, value, getItemLabel, ...restProps } = props;
  return render(
    <>
      <div data-testid="outside" />
      <Select
        value={value}
        onChange={onChange}
        items={items}
        getItemLabel={getItemLabel}
        data-testid={testId}
        {...restProps}
      />
    </>,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}
function getOutside() {
  return screen.getByTestId('outside');
}
function getItemsList() {
  return screen.getByRole('listbox');
}
function getControlValue() {
  return getRender().querySelector(`.${cnSelect('ControlValue')}`) as HTMLDivElement;
}
function getRenderValue() {
  return getRender().querySelector(`.${cnRenderValue()}`) as HTMLDivElement;
}
function getIndicatorsDropdown() {
  return getRender().querySelector(`.${cnSelect('IndicatorsDropdown')}`) as HTMLElement;
}
function indicatorsDropdownClick() {
  fireEvent.click(getIndicatorsDropdown());
}
function getInput() {
  return getRender().querySelector(`.${cnSelect('FakeField')}`) as HTMLElement;
}
function getItems() {
  return getItemsList().querySelectorAll(`.${cnSelectItem()}`);
}
function getRenderItems() {
  return getItemsList().querySelectorAll(`.${cnRenderItem()}`);
}
function getGroups() {
  return getItemsList().querySelectorAll(`.${cnSelectGroupLabel()}`);
}
function getItem(index = 1) {
  return getItems()[index];
}
function inputClick() {
  fireEvent.click(getInput());
}
function outsideClick() {
  fireEvent.mouseDown(getOutside());
}
function animateDelay() {
  act(() => {
    jest.advanceTimersByTime(animationDuration);
  });
}

describe('Компонент Select', () => {
  it('должен рендерится без ошибок', () => {
    expect(renderComponent).not.toThrow();
  });

  it(`Дополнительный className присваевается`, () => {
    const className = 'className';

    renderComponent({ ...defaultProps, className });
    expect(getRender()).toHaveClass(className);
  });

  it('рендерится с установленным значением', () => {
    jest.useFakeTimers();
    const index = 0;
    const value = items[index];
    act(() => {
      renderComponent({
        ...defaultProps,
        value,
      });
    });

    expect(getControlValue().textContent).toEqual(defaultGetItemLabel(value));

    inputClick();
    animateDelay();

    expect(getItem(index)).toHaveClass(cnSelectItem({ active: true }));
  });

  it('открывается и закрывается по клику', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent();
    });

    inputClick();

    animateDelay();

    const optionsList = getItemsList();

    expect(optionsList).toBeInTheDocument();
    inputClick();
    animateDelay();

    expect(optionsList).not.toBeInTheDocument();
  });

  it('открывается и закрывается по клику за пределами селекта', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent();
    });

    inputClick();
    animateDelay();

    const optionsList = getItemsList();

    expect(optionsList).toBeInTheDocument();
    outsideClick();
    animateDelay();
    expect(optionsList).not.toBeInTheDocument();
  });

  it('открывается и закрывается по клику на индикатор', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent();
    });

    indicatorsDropdownClick();
    animateDelay();

    const optionsList = getItemsList();

    expect(optionsList).toBeInTheDocument();
    indicatorsDropdownClick();
    animateDelay();
    expect(optionsList).not.toBeInTheDocument();
  });

  it('отрисовываются опции', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent();
    });

    inputClick();
    animateDelay();
    expect(getItems().length).toEqual(items.length);
  });

  it('отрисовываются группы', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent();
    });

    inputClick();
    animateDelay();
    expect(getGroups().length).toEqual(groups.length);
  });

  it('проверка onChange', () => {
    jest.useFakeTimers();
    const handleChange = jest.fn();
    const elementIndex = 1;
    act(() => {
      renderComponent({ ...defaultProps, onChange: handleChange });
    });

    inputClick();
    animateDelay();

    fireEvent.click(getItem(elementIndex));

    expect(handleChange).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ value: items[elementIndex] }),
    );
  });

  it('вызывается onFocus', () => {
    const handlerFocus = jest.fn();
    renderComponent({ ...defaultProps, onFocus: handlerFocus });

    expect(handlerFocus).toBeCalledTimes(0);

    getInput().focus();

    expect(handlerFocus).toBeCalledTimes(1);
  });

  it('вызывается onBlur', () => {
    const handlerBlur = jest.fn();
    renderComponent({ ...defaultProps, onBlur: handlerBlur });

    getInput().focus();

    expect(handlerBlur).toBeCalledTimes(0);

    getInput().blur();

    expect(handlerBlur).toBeCalledTimes(1);
  });

  it('renderValue отрабатывает верно', () => {
    const value = items[0];
    renderComponent({
      ...defaultProps,
      value,
      renderValue: ({ item }) => <div className={cnRenderValue()}>{defaultGetItemLabel(item)}</div>,
    });

    expect(getRenderValue().textContent).toEqual(defaultGetItemLabel(value));
  });

  it('renderItem отрабатывает верно', () => {
    jest.useFakeTimers();
    act(() => {
      renderComponent({
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

    inputClick();
    animateDelay();

    expect(getRenderItems().length).toEqual(items.length);
  });
});

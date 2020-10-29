import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ResizeObserver from '../__mocks__/ResizeObserver';
import { simpleItems } from '../../Combobox/__mocks__/data.mock';
import { cnSelect } from '../../SelectComponents/cnSelect';
import { MultiCombobox } from '../MultiCombobox';

jest.mock('resize-observer-polyfill', () => {
  return ResizeObserver;
});

const testId = 'MultiCombobox';

type Item = { label: string; value: string };

const renderComponent = (props: {
  value?: Item[];
  className?: string;
  placeholder?: string;
  onChange?: (value: Item[] | null) => void;
}) => {
  return render(
    <div data-testid="outside">
      <MultiCombobox
        {...props}
        id={testId}
        data-testid={testId}
        options={simpleItems}
        getOptionLabel={(item) => item.label}
      />
    </div>,
  );
};

const ValueTest = ({ indexElementAfterClick = [0], indexElementBeforeClick = [1] }) => {
  const [value, setValue] = useState(indexElementAfterClick.map((index) => simpleItems[index]));
  return (
    <div>
      <MultiCombobox
        data-testid={testId}
        id={testId}
        options={simpleItems}
        value={value}
        getOptionLabel={(item) => item.label}
      />
      <button
        data-testid="changerValue"
        onClick={() => setValue(indexElementBeforeClick.map((index) => simpleItems[index]))}
        type="button"
      >
        change
      </button>
    </div>
  );
};

const renderValueTest = (props: {
  indexElementAfterClick: number[];
  indexElementBeforeClick: number[];
}) => {
  return render(<ValueTest {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getControlValue() {
  return getRender().querySelector(`.${cnSelect('ControlValue')}`);
}

function getPlaceholder() {
  return getRender().querySelector(`.${cnSelect('Placeholder')}`);
}

function getOptionsList() {
  return screen.getByRole('listbox');
}

function getOptions() {
  return getOptionsList().querySelectorAll(`.${cnSelect('CheckItem')}`);
}

function getOption(index = 1) {
  return getOptions()[index];
}

function getCheckedOptions() {
  return getOptionsList().querySelectorAll('.Select-CheckItem_active');
}

function getCheckedOptionsText() {
  let text = '';
  getCheckedOptions().forEach((element) => {
    text += element.textContent;
  });
  return text;
}

function getInput() {
  return getRender().querySelector(`.${cnSelect('Input')}`) as HTMLElement;
}

function getIndicatorsDropdown() {
  return getRender().querySelector(`.${cnSelect('IndicatorsDropdown')}`) as HTMLElement;
}

function getOutside() {
  return screen.getByTestId('outside');
}

function getChangerValue() {
  return screen.getByTestId('changerValue');
}

function inputClick() {
  fireEvent.click(getInput());
}

function indicatorsDropdownClick() {
  fireEvent.click(getIndicatorsDropdown());
}

function outsideClick() {
  fireEvent.mouseDown(getOutside());
}

describe('Компонент Combobox', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка className', () => {
    it(`Дополнительный className присваевается`, () => {
      const className = 'className';

      renderComponent({ className });
      expect(getRender()).toHaveClass(className);
    });
  });
  describe('проверка placeholder', () => {
    it(`placeholder отображается`, () => {
      const placeholder = 'placeholder';

      renderComponent({ placeholder });
      expect(getPlaceholder()).toHaveTextContent(placeholder);
    });
  });
  describe('проверка выподающего списка', () => {
    it(`выподающий список открывается по клику инпут`, () => {
      renderComponent({});
      inputClick();
      expect(getOptionsList()).toBeInTheDocument();
    });
    it(`выподающий список открывается по клику на стрелку`, () => {
      renderComponent({});
      indicatorsDropdownClick();
      expect(getOptionsList()).toBeInTheDocument();
    });
    it(`выподающий список закрывается по клику на стрелку`, () => {
      renderComponent({});
      indicatorsDropdownClick();
      const optionsList = getOptionsList();
      indicatorsDropdownClick();
      expect(optionsList).not.toBeInTheDocument();
    });
    it(`выподающий список закрывается по клику вне элемента`, () => {
      renderComponent({});
      indicatorsDropdownClick();
      const optionsList = getOptionsList();
      outsideClick();
      expect(optionsList).not.toBeInTheDocument();
    });
  });
  describe('проверка options', () => {
    it(`options отображается`, () => {
      renderComponent({});
      indicatorsDropdownClick();
      expect(getOptions().length).toEqual(simpleItems.length);
    });
  });
  describe('проверка value', () => {
    const elementIndex = [2, 3];
    const value = elementIndex.map((item) => simpleItems[item]);
    it(`отображается в нипуте`, () => {
      renderComponent({ value });
      expect(getControlValue()).toHaveTextContent(
        elementIndex.map((item) => simpleItems[item].label).join(''),
      );
    });
    it(`подсвечивается в списке опций`, () => {
      renderComponent({ value });
      indicatorsDropdownClick();

      expect(getCheckedOptionsText()).toEqual(
        elementIndex.map((item) => simpleItems[item].label).join(''),
      );
    });
    it(`изменение value c верху`, () => {
      const indexElementAfterClick = [1];
      const indexElementBeforeClick = [4];
      renderValueTest({ indexElementAfterClick, indexElementBeforeClick });
      fireEvent.click(getChangerValue());

      indicatorsDropdownClick();

      expect(getCheckedOptionsText()).toEqual(
        indexElementBeforeClick.map((item) => simpleItems[item].label).join(''),
      );
    });
  });
  describe('проверка onChange', () => {
    it(`клик по элементу, должен вызвать callback c ожидаемыми параметрами`, () => {
      const handleChange = jest.fn();

      renderComponent({ onChange: handleChange });
      inputClick();

      fireEvent.click(getOption(1));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining([simpleItems[1]]));

      fireEvent.click(getOption(2));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining([simpleItems[1], simpleItems[2]]),
      );

      fireEvent.click(getOption(1));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining([simpleItems[2]]));
    });
  });
});

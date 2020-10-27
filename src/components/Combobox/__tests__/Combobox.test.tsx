import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { simpleItems } from '../__mocks__/data.mock';
import ResizeObserver from '../../../../__mocks__/ResizeObserver';
import { cnSelect } from '../../SelectComponents/cnSelect';
import { Combobox } from '../Combobox';

jest.mock('resize-observer-polyfill', () => {
  return ResizeObserver;
});

const testId = 'Combobox';

type Item = { label: string; value: string };

const renderComponent = (props: {
  value?: Item;
  className?: string;
  placeholder?: string;
  onChange?: (value: Item | null) => void;
}) => {
  return render(
    <div data-testid="outside">
      <Combobox
        {...props}
        id={testId}
        data-testid={testId}
        options={simpleItems}
        getOptionLabel={(item) => item.label}
      />
    </div>,
  );
};

const ValueTest = ({ indexElementAfterClick = 0, indexElementBeforeClick = 3 }) => {
  const [value, setValue] = useState(simpleItems[indexElementAfterClick]);
  return (
    <div>
      <Combobox
        data-testid={testId}
        id={testId}
        options={simpleItems}
        value={value}
        getOptionLabel={(item) => item.label}
      />
      <button
        data-testid="changerValue"
        onClick={() => setValue(simpleItems[indexElementBeforeClick])}
        type="button"
      >
        change
      </button>
    </div>
  );
};

const renderValueTest = (props: {
  indexElementAfterClick: number;
  indexElementBeforeClick: number;
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
  return getOptionsList().querySelectorAll(`.${cnSelect('ListItem')}`);
}

function getOption(index = 1) {
  return getOptionsList().querySelectorAll(`.${cnSelect('ListItem')}`)[index];
}

function getCheckedOption() {
  return getOptionsList().querySelector('.Select-ListItem_active');
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
    it(`выпадающий список открывается по клику инпут`, () => {
      renderComponent({});
      inputClick();
      expect(getOptionsList()).toBeInTheDocument();
    });
    it(`выпадающий список открывается по клику на стрелку`, () => {
      renderComponent({});
      indicatorsDropdownClick();
      expect(getOptionsList()).toBeInTheDocument();
    });
    it(`выпадающий список закрывается по клику на стрелку`, () => {
      renderComponent({});
      indicatorsDropdownClick();
      const optionsList = getOptionsList();
      indicatorsDropdownClick();
      expect(optionsList).not.toBeInTheDocument();
    });
    it(`выпадающий список закрывается по клику вне элемента`, () => {
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
    const elementIndex = 3;
    const value = simpleItems[elementIndex];
    it(`отображается в инпуте`, () => {
      renderComponent({ value });
      expect(getControlValue()).toHaveTextContent(simpleItems[elementIndex].label);
    });
    it(`подсвечивается в списке опций`, () => {
      renderComponent({ value });
      indicatorsDropdownClick();
      expect(getCheckedOption()).toHaveTextContent(simpleItems[elementIndex].label);
    });
    it(`изменение value вне компонента`, () => {
      const indexElementAfterClick = 1;
      const indexElementBeforeClick = 4;
      renderValueTest({ indexElementAfterClick, indexElementBeforeClick });
      fireEvent.click(getChangerValue());

      indicatorsDropdownClick();

      expect(getCheckedOption()).toHaveTextContent(simpleItems[indexElementBeforeClick].label);
    });
  });
  describe('проверка onChange', () => {
    it(`клик по элементу, должен вызвать callback c ожидаемыми параметрами`, () => {
      const handleChange = jest.fn();
      const elementIndex = 1;

      renderComponent({ onChange: handleChange });
      inputClick();

      fireEvent.click(getOption(elementIndex));

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining(simpleItems[elementIndex]));
    });
  });
});

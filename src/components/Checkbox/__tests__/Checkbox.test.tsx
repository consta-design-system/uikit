import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { Checkbox, cnCheckbox } from '../Checkbox';

type CheckboxProps = React.ComponentProps<typeof Checkbox>;

const testId = cnCheckbox();

const defaultHandleChange = jest.fn();

const renderComponent = ({
  onChange = defaultHandleChange,
  checked = false,
  ...props
}: Omit<CheckboxProps, 'onChange' | 'checked'> & {
  onChange?: CheckboxProps['onChange'];
  checked?: CheckboxProps['checked'];
}) => {
  return render(
    <Checkbox
      data-testid={testId}
      onChange={onChange}
      checked={checked}
      {...props}
    />,
  );
};

function getRender() {
  return screen.getByTestId(testId);
}

function getLabel() {
  return getRender().querySelector(`.${cnCheckbox('Label')}`);
}

describe('Компонент Checkbox', () => {
  it('должен рендериться без ошибок', () => {
    expect(() => renderComponent({})).not.toThrow();
  });
  describe('проверка props', () => {
    describe('проверка className', () => {
      it(`Дополнительный className присваевается`, () => {
        const className = 'className';

        renderComponent({ className });
        expect(getRender()).toHaveClass(className);
      });
    });
    describe('проверка label', () => {
      it(`label отображается`, () => {
        const label = 'fileName';

        renderComponent({ label });

        const labelElement = getLabel() as HTMLSpanElement;

        expect(labelElement.textContent).toEqual(label);
      });
    });
    describe('проверка onChandge', () => {
      it(`клик должен вызвать callback c ожидаемыми параметрами`, () => {
        const handleChange = jest.fn();

        renderComponent({ onChange: handleChange });

        const element = getRender() as HTMLButtonElement;

        fireEvent.click(element);
        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ checked: true }),
        );
      });
    });
  });
});

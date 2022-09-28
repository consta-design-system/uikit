import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import { cnRadio, Radio } from '../Radio';

type RadioProps = React.ComponentProps<typeof Radio>;

const testId = cnRadio();

const defaultHandleChange = jest.fn();

const renderComponent = ({
  onChange = defaultHandleChange,
  checked = false,
  ...props
}: Omit<RadioProps, 'onChange' | 'checked'> & {
  onChange?: RadioProps['onChange'];
  checked?: RadioProps['checked'];
}) => {
  return render(
    <Radio
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
  return getRender().querySelector(`.${cnRadio('Label')}`);
}

describe('Компонент Radio', () => {
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
        const label = 'label';

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

import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';

import {
  cnHeaderSearchBar,
  HeaderSearchBar,
} from '../SearchBar/HeaderSearchBar';

type HeaderSearchBarProps = React.ComponentProps<typeof HeaderSearchBar>;

const testId = cnHeaderSearchBar();

const renderComponent = (props: HeaderSearchBarProps) => {
  return render(<HeaderSearchBar data-testid={testId} {...props} />);
};

function getRender() {
  return screen.getByTestId(testId);
}

function getInput() {
  return getRender().querySelector(`.${cnHeaderSearchBar('Input')} input`);
}

describe('Компонент HeaderSearchBar', () => {
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
    describe('проверка onChange', () => {
      it(`в callback попадает ожидаемое value`, () => {
        const handleChange = jest.fn();
        const value = 'value';

        renderComponent({ onChange: handleChange });

        const inputElement = getInput() as HTMLInputElement;

        fireEvent.focus(inputElement);
        fireEvent.change(inputElement, { target: { value } });

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value }),
        );
      });
    });
    describe('проверка onSearch', () => {
      it(`в callback попадает ожидаемое value`, () => {
        const handleChange = jest.fn();
        const value = 'value';

        renderComponent({ onSearch: handleChange, value });

        const element = getRender() as HTMLFormElement;

        fireEvent.submit(element);

        expect(handleChange).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(
          expect.objectContaining({ value }),
        );
      });
    });
  });
});

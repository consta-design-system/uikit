import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { DatePicker, DatePickerProps } from '../DatePicker';
import {
  animateDelay,
  getDateTimeItem,
  getDateTimeItemSelected,
  getInput,
  inputFocus,
  testId,
} from './helpers';

const renderComponent = (props: DatePickerProps<'month-range'> = {}) => {
  return render(
    <DatePicker {...props} type="month-range" data-testid={testId} />,
  );
};

describe('Компонент DatePicker_type_monthRange', () => {
  describe('проверка onChage', () => {
    it(`при клике по календарю срабатывает`, () => {
      jest.useFakeTimers();

      const onChange = jest.fn();

      act(() => {
        renderComponent({ onChange, currentVisibleDate: new Date(1970, 0) });
      });

      inputFocus();
      animateDelay();

      inputFocus();

      fireEvent.click(getDateTimeItem(4));

      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('проверка value', () => {
    it(`верно отображается в поле ввода`, () => {
      renderComponent({
        value: [new Date(1970, 0, 15), new Date(1970, 1, 17)],
      });

      expect(getInput()).toHaveValue('01.1970');
    });

    it(`верно отображается в календаре`, () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          value: [new Date(1970, 0, 15), new Date(1970, 2, 17)],
          currentVisibleDate: new Date(1970, 0),
        });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeItemSelected(0)).toHaveTextContent('янв');
      expect(getDateTimeItemSelected(1)).toHaveTextContent('мар');
    });
  });
});

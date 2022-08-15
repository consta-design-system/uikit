import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { DatePicker, DatePickerProps } from '../DatePicker';
import {
  animateDelay,
  getDateTimeDaySelected,
  getDateTimeItem,
  getDateTimeTimeSelected,
  getInput,
  inputFocus,
  testId,
} from './helpers';

const renderComponent = (props: DatePickerProps<'date-time-range'> = {}) => {
  return render(
    <DatePicker {...props} type="date-time-range" data-testid={testId} />,
  );
};

describe('Компонент DatePicker_type_dateTimeRange', () => {
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
        value: [new Date(1970, 0, 15, 10, 11, 12), new Date(1970, 0, 17)],
      });

      expect(getInput()).toHaveValue('15.01.1970 10:11:12');
    });

    it(`верно отображается в календаре`, () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          value: [new Date(1970, 0, 15, 10, 11, 12), new Date(1970, 0, 17)],
        });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeDaySelected()).toHaveTextContent('15');
      expect(getDateTimeTimeSelected(0)).toHaveTextContent('10');
      expect(getDateTimeTimeSelected(1)).toHaveTextContent('11');
      expect(getDateTimeTimeSelected(2)).toHaveTextContent('12');
    });
  });
});

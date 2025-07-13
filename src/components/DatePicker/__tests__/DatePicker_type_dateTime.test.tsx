import { act, fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { DatePicker, DatePickerProps } from '../DatePicker';
import {
  animateDelay,
  getDateTimeDaySelected,
  getDateTimeItem,
  getDateTimeItemByText,
  getDateTimeTimeItem,
  getDateTimeTimeSelected,
  getInput,
  inputFocus,
  testId,
} from './helpers';

const renderComponent = (props: DatePickerProps<'date-time'> = {}) => {
  return render(
    <DatePicker {...props} type="date-time" data-testid={testId} />,
  );
};

describe('Компонент DatePicker_type_dateTime', () => {
  describe('проверка onChange', () => {
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
      renderComponent({ value: new Date(1970, 0, 15, 10, 11, 12) });

      expect(getInput()).toHaveValue('15.01.1970 10:11:12');
    });

    it(`верно отображается в календаре`, () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          value: new Date(1970, 0, 15, 10, 11, 12),
          currentVisibleDate: new Date(1970, 0),
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

  describe('проверка disableDates', () => {
    it('корректно отключает даты', () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          currentVisibleDate: new Date(1970, 0),
          disableDates: [[new Date(1970, 0, 20), new Date(1970, 0, 23)]],
          dateTimeView: 'classic',
        });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeItemByText('20')).toBeDisabled();
      expect(getDateTimeItemByText('21')).toBeDisabled();
      expect(getDateTimeItemByText('22')).toBeDisabled();
    });

    it('корректно отключает часы', () => {
      jest.useFakeTimers();

      act(() => {
        renderComponent({
          value: new Date(1970, 0, 1),
          currentVisibleDate: new Date(1970, 0),
          disableDates: [
            [new Date(1970, 0, 1, 2, 0, 0), new Date(1970, 0, 1, 6, 0, 0)],
          ],
          dateTimeView: 'classic',
        });
      });

      inputFocus();
      animateDelay();

      expect(getDateTimeTimeItem(3)).toBeDisabled(); // время 03:00
      expect(getDateTimeTimeItem(4)).toBeDisabled(); // время 04:00
      expect(getDateTimeTimeItem(5)).toBeDisabled(); // время 05:00
    });
  });
});

import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { DateTime, DateTimeProps } from '../DateTimeCanary';

import { getDateTimeItem, getDateTimeItemsSelected, testId } from './helpers';

const renderComponent = (props: DateTimeProps<'time'> = {}) => {
  return render(<DateTime {...props} type="time" data-testid={testId} />);
};

describe('Компонент DateTime_type_time', () => {
  describe('проверка value', () => {
    it(`выбранная дата отображаеся верно`, () => {
      renderComponent({ value: new Date(1970, 0, 1, 10, 15, 20) });
      const items = getDateTimeItemsSelected();
      expect(items[0]).toHaveTextContent('10');
      expect(items[1]).toHaveTextContent('15');
      expect(items[2]).toHaveTextContent('20');
    });
  });

  describe('проверка onChange', () => {
    it('onChange отрабатывает при клике на месяц', () => {
      const onChange = jest.fn();
      renderComponent({ onChange });

      const DateTimeItem = getDateTimeItem(3);

      fireEvent.click(DateTimeItem);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('onChange отрабатывает в допустимом интервале', () => {
      const onChange = jest.fn();

      renderComponent({
        onChange,
        minDate: new Date(1970, 0, 1, 9, 15, 20),
        maxDate: new Date(1970, 0, 1, 11, 15, 20),
        value: new Date(1970, 0, 1, 10, 15, 20),
      });

      const DateTimeItem = getDateTimeItem(11);

      fireEvent.click(DateTimeItem);

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('onChange не отрабатывает вне допустимого интервала', () => {
      const onChange = jest.fn();

      renderComponent({
        onChange,
        minDate: new Date(1970, 0, 1, 9, 15, 20),
        maxDate: new Date(1970, 0, 1, 11, 15, 20),
        value: new Date(1970, 0, 1, 10, 15, 20),
      });

      const DateTimeItem = getDateTimeItem(1);

      fireEvent.click(DateTimeItem);

      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});

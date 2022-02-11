import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { DateTime, DateTimeProps } from '../DateTimeCanary';

import {
  getDayItem,
  getDayItemsSelected,
  getTimeItem,
  getTimeItemsSelected,
  testId,
} from './helpers';

const renderComponent = (props: DateTimeProps<'date-time'> = {}) => {
  return render(<DateTime {...props} type="date-time" data-testid={testId} />);
};

describe('Компонент DateTime_type_dateTime', () => {
  describe('проверка value', () => {
    it(`выбранная дата отображаеся верно`, () => {
      renderComponent({ value: new Date(1970, 0, 1, 10, 15, 20) });
      const timeItems = getTimeItemsSelected();
      const dayItems = getDayItemsSelected();
      expect(timeItems[0]).toHaveTextContent('10');
      expect(timeItems[1]).toHaveTextContent('15');
      expect(timeItems[2]).toHaveTextContent('20');
      expect(dayItems[0]).toHaveTextContent('1');
    });
  });

  describe('проверка onChange', () => {
    it('onChange отрабатывает', () => {
      const onChange = jest.fn();

      renderComponent({
        onChange,
        currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
      });

      const timeItem = getTimeItem(3);
      const dayItem = getDayItem(11);

      fireEvent.click(timeItem);
      fireEvent.click(dayItem);

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('onChange отрабатывает в допустимом интервале', () => {
      const onChange = jest.fn();

      renderComponent({
        onChange,
        minDate: new Date(1970, 0, 1, 9, 15, 20),
        maxDate: new Date(1970, 0, 1, 11, 15, 20),
        currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
      });

      fireEvent.click(getDayItem(3));

      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('onChange не отрабатывает вне допустимого интервала', () => {
      const onChange = jest.fn();

      renderComponent({
        onChange,
        minDate: new Date(1970, 0, 1, 9, 15, 20),
        maxDate: new Date(1970, 0, 1, 11, 15, 20),
        currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
      });

      fireEvent.click(getDayItem(7));

      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});

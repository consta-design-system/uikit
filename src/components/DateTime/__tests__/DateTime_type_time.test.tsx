import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { DateTime, DateTimeProps } from '../DateTime';
import {
  getColumnAllItem,
  getDateTimeColumnItem,
  getDateTimeItem,
  getDateTimeItemsSelected,
  testId,
} from './helpers';

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

    it('onChange отрабатывает при клике на часы', () => {
      const onChange = jest.fn((value) => new Date(value.value));

      renderComponent({
        onChange,
        value: new Date(1970, 0, 1, 10, 10, 10),
      });

      const dateHoursItem = getDateTimeColumnItem(0, 11);
      fireEvent.click(dateHoursItem);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 1, 11, 0, 0));
    });

    it('onChange отрабатывает при клике на минуты', () => {
      const onChange = jest.fn((value) => new Date(value.value));

      renderComponent({
        onChange,
        value: new Date(1970, 0, 1, 10, 10, 10),
      });

      const dateMinutesItem = getDateTimeColumnItem(1, 11);
      fireEvent.click(dateMinutesItem);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 1, 10, 11, 0));
    });

    it('onChange отрабатывает при клике на секунды', () => {
      const onChange = jest.fn((value) => new Date(value.value));

      renderComponent({
        onChange,
        value: new Date(1970, 0, 1, 10, 10, 10),
      });

      const dateSecondsItem = getDateTimeColumnItem(2, 11);
      fireEvent.click(dateSecondsItem);
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 1, 10, 10, 11));
    });
  });

  // TODO после того как поправится баг с multiplicity проверить тест со значениями начиная от 5
  //  (начиная со значения 5 для multiplicityHours ожидается (0, 5, 10, 15, 20),
  //  а для multiplicityMinutes и multiplicitySeconds начиная со значения 7 ожидается (0, 7, 14, 21, 28, 35, 42, 49, 56),
  //  но последних значений нет)
  describe('проверка multiplicity', () => {
    it('проверка multiplicityHours и возможности менять часы', () => {
      const onChange = jest.fn((value) => new Date(value.value));

      renderComponent({
        multiplicityHours: 2,
        onChange,
        value: new Date(1970, 0, 1, 10, 10, 10),
      });

      const numberColumn = 0;
      const halfHours = 12;
      expect(getColumnAllItem(numberColumn).length).toEqual(halfHours);

      const dateHoursItem = getDateTimeColumnItem(numberColumn, 1);
      fireEvent.click(dateHoursItem);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 1, 2, 0, 0));
    });

    it('проверка multiplicityMinutes и возможности менять минуты', () => {
      const onChange = jest.fn((value) => new Date(value.value));

      renderComponent({
        multiplicityMinutes: 2,
        onChange,
        value: new Date(1970, 0, 1, 10, 10, 10),
      });

      const numberColumn = 1;
      const halfMinutes = 30;
      expect(getColumnAllItem(numberColumn).length).toEqual(halfMinutes);

      const dateMinutesItem = getDateTimeColumnItem(numberColumn, 1);
      fireEvent.click(dateMinutesItem);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 1, 10, 2, 0));
    });

    it('проверка multiplicitySeconds и возможности менять секунды', () => {
      const onChange = jest.fn((value) => new Date(value.value));

      renderComponent({
        multiplicitySeconds: 2,
        onChange,
        value: new Date(1970, 0, 1, 10, 10, 10),
      });

      const numberColumn = 2;
      const halfSeconds = 30;
      expect(getColumnAllItem(numberColumn).length).toEqual(halfSeconds);

      const dateSecondsItem = getDateTimeColumnItem(numberColumn, 1);
      fireEvent.click(dateSecondsItem);
      expect(onChange).toHaveReturnedWith(new Date(1970, 0, 1, 10, 10, 2));
    });
  });
});

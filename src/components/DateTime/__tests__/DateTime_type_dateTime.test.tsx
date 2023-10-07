import { fireEvent, render } from '@testing-library/react';
import faIRLocale from 'date-fns/locale/fa-IR';
import React from 'react';

import { DateTime, DateTimeProps } from '../DateTime';
import {
  getColumnAllItem,
  getDateTimeColumnItem,
  getDateTimeLabel,
  getDateTimeTooglerButtonNext,
  getDateTimeTooglerButtonPrev,
  getDayItem,
  getDayItemsSelected,
  getTimeItem,
  getTimeItemsSelected,
  multiplicity,
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
    it(`onChange отрабатывает`, () => {
      const onChange = jest.fn(({ value }) => new Date(value));

      renderComponent({
        onChange,
        currentVisibleDate: new Date(1970, 0, 1, 10, 15, 20),
      });

      const timeItem = getTimeItem(3);
      const dayItem = getDayItem(11);

      fireEvent.click(timeItem);
      fireEvent.click(dayItem);

      expect(onChange).toHaveBeenCalledTimes(2);

      const date = new Date(1970, 0, 9);
      expect(onChange).toHaveBeenLastCalledWith(date, {
        e: expect.any(Object),
        value: date,
      });
    });

    it(`onChange отрабатывает в допустимом интервале`, () => {
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

    it(`onChange не отрабатывает вне допустимого интервала`, () => {
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

    it(`onChange проверка изменения часа`, () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11),
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const timeItems = getTimeItemsSelected();
      expect(timeItems[0]).toHaveTextContent('11');

      const dateHoursItem = getDateTimeColumnItem(0, 10);
      fireEvent.click(dateHoursItem);

      expect(onChange).toHaveBeenCalledTimes(1);

      const date = new Date(2022, 5, 27, 10);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
        value: date,
      });
    });

    it(`onChange проверка изменения минут`, () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11, 10),
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const timeItems = getTimeItemsSelected();
      expect(timeItems[1]).toHaveTextContent('10');

      const dateMinutesItem = getDateTimeColumnItem(1, 15);
      fireEvent.click(dateMinutesItem);

      expect(onChange).toHaveBeenCalledTimes(1);

      const date = new Date(2022, 5, 27, 11, 15);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
        value: date,
      });
    });

    it(`onChange проверка изменения секунд`, () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11, 10, 20),
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const timeItems = getTimeItemsSelected();
      expect(timeItems[2]).toHaveTextContent('20');

      const dateSecondsItem = getDateTimeColumnItem(2, 35);
      fireEvent.click(dateSecondsItem);

      expect(onChange).toHaveBeenCalledTimes(1);

      const date = new Date(2022, 5, 27, 11, 10, 35);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
        value: date,
      });
    });
  });

  describe('проверка кнопок DateTimeToggler-Button_direction_next/prev', () => {
    it('проверка смены месяца и года через DateTimeToggler-Button_direction_next', () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 4, 27, 11, 10, 20),
        view: 'classic',
        currentVisibleDate: new Date(2022, 4),
        onChange,
      });

      const label = getDateTimeLabel();
      expect(label).toHaveTextContent('май 2022');

      fireEvent.click(getDateTimeTooglerButtonNext());

      expect(label).not.toHaveTextContent('май 2022');
      expect(label).toHaveTextContent('июнь 2022');
    });

    it('проверка смены месяца и года через DateTimeToggler-Button_direction_prev', () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 4, 27, 11, 10, 25),
        view: 'classic',
        currentVisibleDate: new Date(2022, 4),
        onChange,
      });

      fireEvent.click(getDateTimeTooglerButtonPrev());

      const timeItems = getTimeItemsSelected();
      expect(timeItems[2]).toHaveTextContent('25');

      const dateSecondsItem = getDateTimeColumnItem(2, 35);
      fireEvent.click(dateSecondsItem);

      expect(onChange).toHaveBeenCalledTimes(1);

      const date = new Date(2022, 4, 27, 11, 10, 35);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
        value: date,
      });
    });
  });

  // TODO после того как поправится баг с multiplicity проверить тест со значениями начиная от 5
  //  (начиная со значения 5 для multiplicityHours ожидается (0, 5, 10, 15, 20),
  //  а для multiplicityMinutes и multiplicitySeconds начиная со значения 7 ожидается (0, 7, 14, 21, 28, 35, 42, 49, 56),
  //  но последних значений нет)
  describe('проверка multiplicityHours, multiplicityMinutes и multiplicitySeconds', () => {
    multiplicity.forEach((multiplicityHours) => {
      it(`проверка multiplicityHours = ${multiplicityHours} и возможности менять часы`, () => {
        const onChange = jest.fn(({ value }) => new Date(value));
        renderComponent({
          value: new Date(2022, 5, 27, 11),
          currentVisibleDate: new Date(2022, 5),
          onChange,
          multiplicityHours,
        });

        if (multiplicityHours === 0) {
          const timeItems = getTimeItemsSelected();
          expect(timeItems[0]).not.toHaveTextContent('11');
          expect(timeItems[1]).not.toHaveTextContent('11');
          expect(timeItems).toHaveLength(2);
        } else {
          const hoursColumn = getColumnAllItem(0).length;
          expect(hoursColumn).toEqual(Math.ceil(24 / multiplicityHours));

          const currentHour = getColumnAllItem(0)[1];
          fireEvent.click(currentHour);

          const date = new Date(2022, 5, 27, multiplicityHours);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
            value: date,
          });
        }
      });

      multiplicity.forEach((multiplicityMinutes) => {
        it(`проверка multiplicityMinutes = ${multiplicityMinutes} и возможности менять минуты`, () => {
          const onChange = jest.fn(({ value }) => new Date(value));
          renderComponent({
            value: new Date(2022, 5, 27, 11, 34),
            currentVisibleDate: new Date(2022, 5),
            onChange,
            multiplicityMinutes,
          });

          if (multiplicityMinutes === 0) {
            const timeItems = getTimeItemsSelected();
            expect(timeItems[0]).not.toHaveTextContent('34');
            expect(timeItems[1]).not.toHaveTextContent('34');
            expect(timeItems).toHaveLength(2);
          } else {
            const minutesColumn = getColumnAllItem(1).length;
            expect(minutesColumn).toEqual(Math.ceil(60 / multiplicityMinutes));

            const currentMinutes = getColumnAllItem(1)[1];
            fireEvent.click(currentMinutes);
            const date = new Date(2022, 5, 27, 11, multiplicityMinutes);

            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
              value: date,
            });
          }
        });
      });

      multiplicity.forEach((multiplicitySeconds) => {
        it(`проверка multiplicitySeconds = ${multiplicitySeconds} и возможности менять секунды`, () => {
          const onChange = jest.fn(({ value }) => new Date(value));
          renderComponent({
            value: new Date(2022, 5, 27, 11, 34, 56),
            currentVisibleDate: new Date(2022, 5),
            onChange,
            multiplicitySeconds,
          });

          if (multiplicitySeconds === 0) {
            const timeItems = getTimeItemsSelected();
            expect(timeItems[0]).not.toHaveTextContent('56');
            expect(timeItems[1]).not.toHaveTextContent('56');
            expect(timeItems).toHaveLength(2);
          } else {
            const secondsColumn = getColumnAllItem(2).length;
            expect(secondsColumn).toEqual(Math.ceil(60 / multiplicitySeconds));

            const currentSeconds = getColumnAllItem(2)[1];
            fireEvent.click(currentSeconds);

            const date = new Date(2022, 5, 27, 11, 34, multiplicitySeconds);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
              value: date,
            });
          }
        });
      });
    });
  });

  describe('проверка locale', () => {
    it(`проверка применения locale="fa-IR"`, () => {
      renderComponent({
        locale: faIRLocale,
        currentVisibleDate: new Date(2022, 5),
      });

      const label = getDateTimeLabel();
      expect(label).toHaveTextContent('جون 2022');
    });
  });
});

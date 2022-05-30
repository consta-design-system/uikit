import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { DateTime, DateTimeProps } from '../DateTimeCanary';

import {
  getColumnAllItem,
  getDateTimeColumnItem,
  getDateTimeLabel,
  getDateTimeTooglerButtonNext,
  getDateTimeTooglerButtonPrev,
  getDayItem,
  getDayItems,
  getDayItemsSelected,
  getMultiplicityItem,
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

    it('onChange проверка изменения дня', () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11, 10, 20),
        view: 'classic',
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const currentDay = getDayItemsSelected();
      expect(currentDay[0]).toHaveTextContent('27');

      const dayItem = getDayItems()[17];
      fireEvent.click(dayItem);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveReturnedWith(new Date(2022, 5, 16, 11, 10, 20));
    });

    it('onChange проверка изменения часа', () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11),
        view: 'classic',
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const timeItems = getTimeItemsSelected();
      expect(timeItems[0]).toHaveTextContent('11');

      const dateHoursItem = getDateTimeColumnItem(0, 10);
      fireEvent.click(dateHoursItem);

      expect(onChange).toHaveReturnedWith(new Date(2022, 5, 27, 10));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('onChange проверка изменения минут', () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11, 10),
        view: 'classic',
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const timeItems = getTimeItemsSelected();
      expect(timeItems[1]).toHaveTextContent('10');

      const dateMinutesItem = getDateTimeColumnItem(1, 15);
      fireEvent.click(dateMinutesItem);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveReturnedWith(new Date(2022, 5, 27, 11, 15));
    });

    it('onChange проверка изменения секунд', () => {
      const onChange = jest.fn(({ value }) => new Date(value));
      renderComponent({
        value: new Date(2022, 5, 27, 11, 10, 20),
        view: 'classic',
        currentVisibleDate: new Date(2022, 5),
        onChange,
      });

      const timeItems = getTimeItemsSelected();
      expect(timeItems[2]).toHaveTextContent('20');

      const dateSecondsItem = getDateTimeColumnItem(2, 35);
      fireEvent.click(dateSecondsItem);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveReturnedWith(new Date(2022, 5, 27, 11, 10, 35));
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

      it('проверка смены value при клике по DateTimeToggler-Button_direction_prev/next', () => {
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
        expect(onChange).toHaveReturnedWith(new Date(2022, 4, 27, 11, 10, 35));

        fireEvent.click(getDateTimeTooglerButtonNext());

        const dateHoursItem = getDateTimeColumnItem(0, 10);

        fireEvent.click(dateHoursItem);

        expect(onChange).toHaveLastReturnedWith(new Date(2022, 4, 27, 10));
        expect(onChange).toHaveBeenCalledTimes(2);
      });
    });

    describe('проверка multiplicityHours, multiplicityMinutes и multiplicitySeconds', () => {
      getMultiplicityItem.forEach((multiplicityHours) => {
        it(`проверка multiplicityHours = ${multiplicityHours} и возможности менять часы`, () => {
          const onChange = jest.fn(({ value }) => new Date(value));
          renderComponent({
            value: new Date(2022, 5, 27, 11),
            view: 'classic',
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
            const firstHour = getColumnAllItem(0)[0];
            const secondHour = getColumnAllItem(0)[1];
            const thirdHour = getColumnAllItem(0)[2];
            expect(firstHour).toHaveTextContent('00');
            expect(secondHour).toHaveTextContent(`0${multiplicityHours}`);
            expect(thirdHour).toHaveTextContent(
              multiplicityHours > 4 ? `${multiplicityHours * 2}` : `0${multiplicityHours * 2}`,
            );
            expect(hoursColumn).toEqual(Math.ceil(24 / multiplicityHours));

            fireEvent.click(secondHour);
            expect(onChange).toHaveReturnedWith(new Date(2022, 5, 27, multiplicityHours));
          }
        });

        getMultiplicityItem.forEach((multiplicityMinutes) => {
          it(`проверка multiplicityMinutes = ${multiplicityMinutes} и возможности менять минуты`, () => {
            const onChange = jest.fn(({ value }) => new Date(value));
            renderComponent({
              value: new Date(2022, 5, 27, 11, 34),
              view: 'classic',
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
              const firstMinutes = getColumnAllItem(1)[0];
              const secondMinutes = getColumnAllItem(1)[1];
              const thirdMinutes = getColumnAllItem(1)[2];
              expect(firstMinutes).toHaveTextContent('00');
              expect(secondMinutes).toHaveTextContent(`0${multiplicityMinutes}`);
              expect(thirdMinutes).toHaveTextContent(
                multiplicityMinutes > 4
                  ? `${multiplicityMinutes * 2}`
                  : `0${multiplicityMinutes * 2}`,
              );
              expect(minutesColumn).toEqual(Math.ceil(60 / multiplicityMinutes));

              fireEvent.click(secondMinutes);
              expect(onChange).toHaveReturnedWith(new Date(2022, 5, 27, 11, multiplicityMinutes));
            }
          });
        });

        getMultiplicityItem.forEach((multiplicitySeconds) => {
          it(`проверка multiplicitySeconds = ${multiplicitySeconds} и возможности менять секунды`, () => {
            const onChange = jest.fn(({ value }) => new Date(value));
            renderComponent({
              value: new Date(2022, 5, 27, 11, 34, 56),
              view: 'classic',
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
              const firstSeconds = getColumnAllItem(2)[0];
              const secondSeconds = getColumnAllItem(2)[1];
              const thirdSeconds = getColumnAllItem(2)[2];
              expect(firstSeconds).toHaveTextContent('00');
              expect(secondSeconds).toHaveTextContent(`0${multiplicitySeconds}`);
              expect(thirdSeconds).toHaveTextContent(
                multiplicitySeconds > 4
                  ? `${multiplicitySeconds * 2}`
                  : `0${multiplicitySeconds * 2}`,
              );
              expect(secondsColumn).toEqual(Math.ceil(60 / multiplicitySeconds));

              fireEvent.click(secondSeconds);
              expect(onChange).toHaveReturnedWith(
                new Date(2022, 5, 27, 11, 34, multiplicitySeconds),
              );
            }
          });
        });
      });
    });
  });
});

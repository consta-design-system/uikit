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
    it(`выбранная дата отображается верно`, () => {
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

      const date = new Date(1970, 0, 1, 11, 0, 0);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
      });
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

      const date = new Date(1970, 0, 1, 10, 11, 0);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
      });
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

      const date = new Date(1970, 0, 1, 10, 10, 11);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
      });
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

      const date = new Date(1970, 0, 1, 2, 0, 0);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
      });
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

      const date = new Date(1970, 0, 1, 10, 2, 0);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
      });
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

      const date = new Date(1970, 0, 1, 10, 10, 2);
      expect(onChange).toHaveBeenCalledWith(date, {
        e: expect.any(Object),
      });
    });
  });

  describe('проверка timeOptions для hours/minutes/seconds', () => {
    const onChange = jest.fn((value) => new Date(value.value));
    const baseDate = new Date(1970, 0, 1, 11, 34, 56);

    describe('проверка step (sequence from 0)', () => {
      const steps = [0, 1, 2, 5, 10];

      steps.forEach((step) => {
        it(`проверка timeOptions.hours.step = ${step} и возможности менять часы`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { hours: { step } },
          });
          if (step === 0) {
            const timeItems = getDateTimeItemsSelected();
            expect(timeItems).toHaveLength(2);
          } else {
            const hoursColumn = getColumnAllItem(0).length;
            expect(hoursColumn).toEqual(Math.ceil(24 / step));
            const currentHour = getColumnAllItem(0)[1];
            fireEvent.click(currentHour);
            const date = new Date(1970, 0, 1, step);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }
        });
      });

      steps.forEach((step) => {
        it(`проверка timeOptions.minutes.step = ${step} и возможности менять минуты`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { minutes: { step } },
          });
          if (step === 0) {
            const timeItems = getDateTimeItemsSelected();
            expect(timeItems).toHaveLength(2);
          } else {
            const minutesColumn = getColumnAllItem(1).length;
            expect(minutesColumn).toEqual(Math.ceil(60 / step));
            const currentMinutes = getColumnAllItem(1)[1];
            fireEvent.click(currentMinutes);
            const date = new Date(1970, 0, 1, 11, step);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }
        });
      });

      steps.forEach((step) => {
        it(`проверка timeOptions.seconds.step = ${step} и возможности менять секунды`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { seconds: { step } },
          });
          if (step === 0) {
            const timeItems = getDateTimeItemsSelected();
            expect(timeItems).toHaveLength(2);
          } else {
            const secondsColumn = getColumnAllItem(2).length;
            expect(secondsColumn).toEqual(Math.ceil(60 / step));
            const currentSeconds = getColumnAllItem(2)[1];
            fireEvent.click(currentSeconds);
            const date = new Date(1970, 0, 1, 11, 34, step);
            expect(onChange).toHaveBeenCalledWith(date, {
              e: expect.any(Object),
            });
          }
        });
      });
    });

    describe('проверка start', () => {
      const startValues1 = [-10, 0, 5, 10, 30];
      const startValues2 = [-10, 0, 5, 10, 30, 59, 60];

      startValues1.forEach((start) => {
        it(`проверка timeOptions.hours.start = ${start} (full stop=23, step=1)`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { hours: { start } },
          });
          const hoursColumn = getColumnAllItem(0);
          const clampedStart = Math.max(0, Math.min(23, start));
          expect(hoursColumn.length).toEqual(24 - clampedStart);
          const firstHour = getColumnAllItem(0)[0];
          fireEvent.click(firstHour);
          const date = new Date(1970, 0, 1, clampedStart);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        });
      });

      startValues2.forEach((start) => {
        it(`проверка timeOptions.minutes.start = ${start} (full stop=59, step=1)`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { minutes: { start } },
          });
          const minutesColumn = getColumnAllItem(1);
          const clampedStart = Math.max(0, Math.min(59, start));
          expect(minutesColumn.length).toEqual(60 - clampedStart);
          const firstMinutes = getColumnAllItem(1)[0];
          fireEvent.click(firstMinutes);
          const date = new Date(1970, 0, 1, 11, clampedStart);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        });
      });

      startValues2.forEach((start) => {
        it(`проверка timeOptions.seconds.start = ${start} (full stop=59, step=1)`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { seconds: { start } },
          });
          const secondsColumn = getColumnAllItem(2);
          const clampedStart = Math.max(0, Math.min(59, start));
          expect(secondsColumn.length).toEqual(60 - clampedStart);
          const firstSeconds = getColumnAllItem(2)[0];
          fireEvent.click(firstSeconds);
          const date = new Date(1970, 0, 1, 11, 34, clampedStart);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        });
      });
    });

    describe('проверка timeOptions.stop (stop to N, start=0, step=1)', () => {
      const stopValues1 = [-5, 5, 10, 20, 30];
      const stopValues2 = [-10, 10, 20, 50, 70];

      stopValues1.forEach((stop) => {
        it(`проверка timeOptions.hours.stop = ${stop} (start=0, step=1)`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { hours: { stop } },
          });
          const hoursColumn = getColumnAllItem(0);
          const clampedStop = Math.max(0, Math.min(23, stop));
          expect(hoursColumn.length).toEqual(clampedStop + 1);
          const lastHour = getColumnAllItem(0)[clampedStop];
          fireEvent.click(lastHour);
          const date = new Date(1970, 0, 1, clampedStop);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        });
      });

      stopValues2.forEach((stop) => {
        it(`проверка timeOptions.minutes.stop = ${stop} (start=0, step=1)`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { minutes: { stop } },
          });
          const minutesColumn = getColumnAllItem(1);
          const clampedStop = Math.max(0, Math.min(59, stop));
          expect(minutesColumn.length).toEqual(clampedStop + 1);
          const lastMinutes = getColumnAllItem(1)[clampedStop];
          fireEvent.click(lastMinutes);
          const date = new Date(1970, 0, 1, 11, clampedStop);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        });
      });

      stopValues2.forEach((stop) => {
        it(`проверка timeOptions.seconds.stop = ${stop} (start=0, step=1)`, () => {
          renderComponent({
            value: baseDate,
            onChange,
            timeOptions: { seconds: { stop } },
          });
          const secondsColumn = getColumnAllItem(2);
          const clampedStop = Math.max(0, Math.min(59, stop));
          expect(secondsColumn.length).toEqual(clampedStop + 1);
          const lastSeconds = getColumnAllItem(2)[clampedStop];
          fireEvent.click(lastSeconds);
          const date = new Date(1970, 0, 1, 11, 34, clampedStop);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        });
      });
    });

    describe('проверка start/stop/step комбинации', () => {
      it(`проверка timeOptions.hours.step=5, start=5, stop=15 (combination, no swap)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { hours: { step: 5, start: 5, stop: 15 } },
        });
        const hoursColumn = getColumnAllItem(0).length;
        expect(hoursColumn).toEqual(3);
        const firstHour = getColumnAllItem(0)[0];
        fireEvent.click(firstHour);
        const date = new Date(1970, 0, 1, 5);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.hours.step=3, start=20, stop=10 (swap to 10-20)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { hours: { step: 3, start: 20, stop: 10 } },
        });
        const hoursColumn = getColumnAllItem(0).length;
        expect(hoursColumn).toEqual(4);
        const firstHour = getColumnAllItem(0)[0];
        fireEvent.click(firstHour);
        const date = new Date(1970, 0, 1, 10);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.hours.step=2, start=0, stop=30 (clamp stop=23)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { hours: { step: 2, start: 0, stop: 30 } },
        });
        const hoursColumn = getColumnAllItem(0).length;
        expect(hoursColumn).toEqual(12);
        const firstHour = getColumnAllItem(0)[0];
        fireEvent.click(firstHour);
        const date = new Date(1970, 0, 1, 0);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.minutes.step=10, start=10, stop=50 (combination)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { minutes: { step: 10, start: 10, stop: 50 } },
        });
        const minutesColumn = getColumnAllItem(1).length;
        expect(minutesColumn).toEqual(5);
        const firstMinutes = getColumnAllItem(1)[0];
        fireEvent.click(firstMinutes);
        const date = new Date(1970, 0, 1, 11, 10);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.minutes.step=5, start=50, stop=20 (swap to 20-50)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { minutes: { step: 5, start: 50, stop: 20 } },
        });
        const minutesColumn = getColumnAllItem(1).length;
        expect(minutesColumn).toEqual(7);
        const firstMinutes = getColumnAllItem(1)[0];
        fireEvent.click(firstMinutes);
        const date = new Date(1970, 0, 1, 11, 20);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.minutes.step=10, start=-5, stop=70 (clamp start=0, stop=59)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { minutes: { step: 10, start: -5, stop: 70 } },
        });
        const minutesColumn = getColumnAllItem(1).length;
        expect(minutesColumn).toEqual(6);
        const firstMinutes = getColumnAllItem(1)[0];
        fireEvent.click(firstMinutes);
        const date = new Date(1970, 0, 1, 11, 0);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.seconds.step=15, start=15, stop=45 (combination)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: { step: 15, start: 15, stop: 45 } },
        });
        const secondsColumn = getColumnAllItem(2).length;
        expect(secondsColumn).toEqual(3);
        const firstSeconds = getColumnAllItem(2)[0];
        fireEvent.click(firstSeconds);
        const date = new Date(1970, 0, 1, 11, 34, 15);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.seconds.step=10, start=50, stop=20 (swap to 20-50)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: { step: 10, start: 50, stop: 20 } },
        });
        const secondsColumn = getColumnAllItem(2).length;
        expect(secondsColumn).toEqual(4);
        const firstSeconds = getColumnAllItem(2)[0];
        fireEvent.click(firstSeconds);
        const date = new Date(1970, 0, 1, 11, 34, 20);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it(`проверка timeOptions.seconds.step=20, start=-10, stop=80 (clamp start=0, stop=59)`, () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: { step: 20, start: -10, stop: 80 } },
        });
        const secondsColumn = getColumnAllItem(2).length;
        expect(secondsColumn).toEqual(3);
        const firstSeconds = getColumnAllItem(2)[0];
        fireEvent.click(firstSeconds);
        const date = new Date(1970, 0, 1, 11, 34, 0);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });
    });

    describe('проверка custom timeOptions (кастомный список значений)', () => {
      it('корректный custom список для hours', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { hours: [0, 1, 5, 10, 15, 23] },
        });
        const hoursColumn = getColumnAllItem(0);
        expect(hoursColumn).toHaveLength(6);
        expect(hoursColumn[0]).toHaveTextContent('00');
        expect(hoursColumn[5]).toHaveTextContent('23');
        fireEvent.click(hoursColumn[3]);
        const date = new Date(1970, 0, 1, 10);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it('повторы и числа вне диапазона для hours — фильтруются', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { hours: [-5, 0, 0, 1, 10, 25, 40, 40] },
        });
        const hoursColumn = getColumnAllItem(0);
        expect(hoursColumn).toHaveLength(3);
        const labels = Array.from(hoursColumn).map((el) => el.textContent);
        expect(labels).toEqual(['00', '01', '10']);
      });

      it('пустой custom массив для hours — колонка пустая', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { hours: [] },
        });
        const timeItems = getDateTimeItemsSelected();
        expect(timeItems).toHaveLength(2);
      });

      it('корректный custom список для minutes', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { minutes: [0, 5, 15, 30, 45] },
        });
        const minutesColumn = getColumnAllItem(1);
        expect(minutesColumn).toHaveLength(5);
        expect(minutesColumn[0]).toHaveTextContent('00');
        expect(minutesColumn[4]).toHaveTextContent('45');
        fireEvent.click(minutesColumn[1]);
        const date = new Date(1970, 0, 1, 11, 5);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it('повторы и вне диапазона minutes', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { minutes: [-1, 0, 0, 30, 59, 60, 120, 60] },
        });
        const minutesColumn = getColumnAllItem(1);
        expect(minutesColumn).toHaveLength(3);
        const labels = Array.from(minutesColumn).map((el) => el.textContent);
        expect(labels).toEqual(['00', '30', '59']);
      });

      it('пустой custom для minutes — колонка пустая', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { minutes: [] },
        });
        const timeItems = getDateTimeItemsSelected();
        expect(timeItems).toHaveLength(2);
      });

      it('корректный custom список для seconds', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: [0, 10, 23, 33, 40, 50] },
        });
        const secondsColumn = getColumnAllItem(2);
        expect(secondsColumn).toHaveLength(6);
        expect(secondsColumn[0]).toHaveTextContent('00');
        expect(secondsColumn[5]).toHaveTextContent('50');
        fireEvent.click(secondsColumn[2]);
        const date = new Date(1970, 0, 1, 11, 34, 23);
        expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
      });

      it('повторы и вне диапазона seconds', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: [-10, -10, 0, 0, 59, 59, 60, 100] },
        });
        const secondsColumn = getColumnAllItem(2);
        expect(secondsColumn).toHaveLength(2);
        const labels = Array.from(secondsColumn).map((el) => el.textContent);
        expect(labels).toEqual(['00', '59']);
      });

      it('пустой custom для seconds — колонка пустая', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: [] },
        });
        const timeItems = getDateTimeItemsSelected();
        expect(timeItems).toHaveLength(2);
      });

      it('undefined custom — fallback на стандартный диапазон', () => {
        renderComponent({
          value: baseDate,
          onChange,
          timeOptions: { seconds: {} },
        });
        const secondsColumn = getColumnAllItem(2);
        expect(secondsColumn).toHaveLength(60);
      });
    });
  });

  describe('совместимость timeOptions и multiplicity', () => {
    const onChange = jest.fn((value) => new Date(value.value));
    const baseDate = new Date(1970, 0, 1, 11, 34, 56);

    it('timeOptions.step имеет приоритет над multiplicity', () => {
      renderComponent({
        value: baseDate,
        onChange,
        multiplicityHours: 5,
        timeOptions: { hours: { step: 2 } },
      });

      const hoursColumn = getColumnAllItem(0);
      expect(hoursColumn.length).toEqual(Math.ceil(24 / 2));

      const firstHour = hoursColumn[0];
      fireEvent.click(firstHour);
      const date = new Date(1970, 0, 1);
      expect(onChange).toHaveBeenCalledWith(date, { e: expect.any(Object) });
    });

    it('timeOptions.unit как массив имеет приоритет над multiplicity', () => {
      renderComponent({
        value: baseDate,
        onChange,
        timeOptions: { hours: [0, 6, 12, 18] },
        multiplicityHours: 3,
      });

      const hoursColumn = getColumnAllItem(0);
      expect(hoursColumn).toHaveLength(4);
      expect(hoursColumn[0]).toHaveTextContent('00');
      expect(hoursColumn[3]).toHaveTextContent('18');
    });

    it('частичное указание timeOptions использует multiplicity для остальных', () => {
      const onChange = jest.fn((value) => new Date(value.value));
      renderComponent({
        value: new Date(1970, 0, 1, 11, 30, 45),
        multiplicityHours: 4,
        multiplicitySeconds: 20,
        timeOptions: { minutes: { step: 15 } },
        onChange,
      });

      const hoursColumn = getColumnAllItem(0);
      expect(hoursColumn.length).toEqual(Math.ceil(24 / 4));

      const minutesColumn = getColumnAllItem(1);
      expect(minutesColumn.length).toEqual(Math.ceil(60 / 15));

      const secondsColumn = getColumnAllItem(2);
      expect(secondsColumn.length).toEqual(Math.ceil(60 / 20));
    });
  });

  describe('проверка multiplicityHours, multiplicityMinutes и multiplicitySeconds', () => {
    const multiplicity = [0, 1, 2, 5, 10];

    multiplicity.forEach((multiplicityHours) => {
      it(`проверка multiplicityHours = ${multiplicityHours} и возможности менять часы`, () => {
        const onChange = jest.fn((value) => new Date(value.value));
        renderComponent({
          value: new Date(1970, 0, 1, 11, 34, 56),
          onChange,
          multiplicityHours,
        });

        if (multiplicityHours === 0) {
          const timeItems = getDateTimeItemsSelected();
          expect(timeItems[0]).not.toHaveTextContent('11');
          expect(timeItems[1]).not.toHaveTextContent('11');
          expect(timeItems).toHaveLength(2);
        } else {
          const hoursColumn = getColumnAllItem(0).length;
          expect(hoursColumn).toEqual(Math.ceil(24 / multiplicityHours));

          const currentHour = getColumnAllItem(0)[1];
          fireEvent.click(currentHour);

          const date = new Date(1970, 0, 1, multiplicityHours);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }
      });
    });

    multiplicity.forEach((multiplicityMinutes) => {
      it(`проверка multiplicityMinutes = ${multiplicityMinutes} и возможности менять минуты`, () => {
        const onChange = jest.fn((value) => new Date(value.value));
        renderComponent({
          value: new Date(1970, 0, 1, 11, 34, 56),
          onChange,
          multiplicityMinutes,
        });

        if (multiplicityMinutes === 0) {
          const timeItems = getDateTimeItemsSelected();
          expect(timeItems[0]).not.toHaveTextContent('34');
          expect(timeItems[1]).not.toHaveTextContent('34');
          expect(timeItems).toHaveLength(2);
        } else {
          const minutesColumn = getColumnAllItem(1).length;
          expect(minutesColumn).toEqual(Math.ceil(60 / multiplicityMinutes));

          const currentMinutes = getColumnAllItem(1)[1];
          fireEvent.click(currentMinutes);
          const date = new Date(1970, 0, 1, 11, multiplicityMinutes);

          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }
      });
    });

    multiplicity.forEach((multiplicitySeconds) => {
      it(`проверка multiplicitySeconds = ${multiplicitySeconds} и возможности менять секунды`, () => {
        const onChange = jest.fn((value) => new Date(value.value));
        renderComponent({
          value: new Date(1970, 0, 1, 11, 34, 56),
          onChange,
          multiplicitySeconds,
        });

        if (multiplicitySeconds === 0) {
          const timeItems = getDateTimeItemsSelected();
          expect(timeItems[0]).not.toHaveTextContent('56');
          expect(timeItems[1]).not.toHaveTextContent('56');
          expect(timeItems).toHaveLength(2);
        } else {
          const secondsColumn = getColumnAllItem(2).length;
          expect(secondsColumn).toEqual(Math.ceil(60 / multiplicitySeconds));

          const currentSeconds = getColumnAllItem(2)[1];
          fireEvent.click(currentSeconds);

          const date = new Date(1970, 0, 1, 11, 34, multiplicitySeconds);
          expect(onChange).toHaveBeenCalledWith(date, {
            e: expect.any(Object),
          });
        }
      });
    });
  });
});

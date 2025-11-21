import { startOfDay } from 'date-fns';

import { getFirstValidDateTime } from '../DateTimeTypeTime/helpers';
import { DateTimePropDisableDates } from '../helpers';

describe('getFirstValidDateTime', () => {
  const baseDate = startOfDay(new Date(1970, 0, 1));

  it('возвращает первую валидную дату при полном диапазоне', () => {
    const result = getFirstValidDateTime(baseDate);
    expect(result).toEqual(new Date(1970, 0, 1, 0, 0, 0));
  });

  it('возвращает startOfDay когда нет валидных часов', () => {
    const result = getFirstValidDateTime(baseDate, { hours: [] });
    expect(result).toEqual(baseDate);
  });

  it('возвращает первую валидную дату с ограниченными часами', () => {
    const result = getFirstValidDateTime(baseDate, { hours: [5, 10, 15] });
    expect(result).toEqual(new Date(1970, 0, 1, 5, 0, 0));
  });

  it('возвращает первую валидную дату с ограниченными часами и минутами', () => {
    const result = getFirstValidDateTime(baseDate, {
      hours: [5, 10],
      minutes: [15, 30],
    });
    expect(result).toEqual(new Date(1970, 0, 1, 5, 15, 0));
  });

  it('пропускает час если нет валидных часов (minDate)', () => {
    const minDate = new Date(1970, 0, 1, 6);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10],
      },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 0, 0));
  });

  it('пропускает час и минуту если нет валидных минут (minDate)', () => {
    const minDate = new Date(1970, 0, 1, 5, 45);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10],
        minutes: [15, 30],
      },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 15, 0));
  });

  it('пропускает час минуту и секунду если нет валидных секунд (minDate)', () => {
    const minDate = new Date(1970, 0, 1, 5, 30, 50);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10],
        minutes: [15, 30],
        seconds: [0, 30, 45],
      },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 15, 0));
  });

  it('работает с minDate ограничениями - пропускает недоступные часы', () => {
    const minDate = new Date(1970, 0, 1, 8, 30, 0);
    const result = getFirstValidDateTime(
      baseDate,
      { hours: { step: 1 } },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 8, 30, 0));
  });

  it('работает с minDate ограничениями - находит первый доступный час', () => {
    const minDate = new Date(1970, 0, 1, 12, 0, 0);
    const result = getFirstValidDateTime(
      baseDate,
      { hours: [5, 10, 15] },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 15, 0, 0));
  });

  it('работает с minDate ограничениями - учитывает минуты в minDate', () => {
    const minDate = new Date(1970, 0, 1, 10, 45, 0);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10, 15],
        minutes: [0, 30, 45],
      },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 45, 0));
  });

  it('работает с minDate ограничениями - пропускает час если все минуты недоступны', () => {
    const minDate = new Date(1970, 0, 1, 10, 46, 0);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10, 15],
        minutes: [0, 30, 45],
      },
      minDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 15, 0, 0));
  });

  it('работает с maxDate ограничениями - обрезает доступные часы', () => {
    const maxDate = new Date(1970, 0, 1, 8, 0, 0);
    const result = getFirstValidDateTime(
      baseDate,
      { hours: { step: 1 } },
      undefined,
      maxDate,
    );
    expect(result.getHours()).toBeLessThanOrEqual(8);
  });

  it('работает с maxDate ограничениями - не находит валидной даты если все часы недоступны', () => {
    const maxDate = new Date(1970, 0, 1, 4, 0, 0);
    const result = getFirstValidDateTime(
      baseDate,
      { hours: [5, 10, 15] },
      undefined,
      maxDate,
    );
    expect(result).toEqual(baseDate);
  });

  it('работает с minDate и maxDate одновременно', () => {
    const minDate = new Date(1970, 0, 1, 6, 0, 0);
    const maxDate = new Date(1970, 0, 1, 18, 0, 0);
    const result = getFirstValidDateTime(
      baseDate,
      { hours: { step: 1 } },
      minDate,
      maxDate,
    );
    expect(result.getHours()).toBeGreaterThanOrEqual(6);
    expect(result.getHours()).toBeLessThanOrEqual(18);
  });

  it('работает с minDate/maxDate и ограниченными минутами', () => {
    const minDate = new Date(1970, 0, 1, 10, 15, 0);
    const maxDate = new Date(1970, 0, 1, 10, 45, 0);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [10],
        minutes: [0, 30, 45],
      },
      minDate,
      maxDate,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 30, 0));
  });

  it('работает с disableDates - пропускает отключенные даты (одиночные даты)', () => {
    const disableDates: DateTimePropDisableDates = [
      new Date(1970, 0, 1, 5, 0, 0),
      new Date(1970, 0, 1, 10, 0, 0),
    ];
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10, 15],
        minutes: [0],
        seconds: { stop: 0 },
      },
      undefined,
      undefined,
      disableDates,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 15, 0, 0));
  });

  it('работает с disableDates - пропускает отключенные диапазоны', () => {
    const disableDates: DateTimePropDisableDates = [
      [new Date(1970, 0, 1, 5, 0, 0), new Date(1970, 0, 1, 10, 0, 0)],
    ];
    const result = getFirstValidDateTime(
      baseDate,
      { hours: [5, 10, 15] },
      undefined,
      undefined,
      disableDates,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 0, 1));
  });

  it('работает с disableDates - пропускает час если все минуты в отключенном диапазоне', () => {
    const disableDates: DateTimePropDisableDates = [
      [new Date(1970, 0, 1, 5, 0, 0), new Date(1970, 0, 1, 5, 59, 59)],
    ];
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 10],
        minutes: [0, 15, 30],
      },
      undefined,
      undefined,
      disableDates,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 10, 0, 0));
  });

  it('работает с комбинацией minDate и disableDates', () => {
    const minDate = new Date(1970, 0, 1, 6, 0, 0);
    const disableDates: DateTimePropDisableDates = [
      new Date(1970, 0, 1, 6, 0, 0),
    ];
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5, 6, 7],
        minutes: { stop: 0 },
        seconds: [0],
      },
      minDate,
      undefined,
      disableDates,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 7, 0, 0));
  });

  it('работает с edge case - minDate позже всех доступных часов', () => {
    const minDate = new Date(1970, 0, 1, 20, 0, 0);
    const result = getFirstValidDateTime(
      baseDate,
      { hours: [5, 10, 15] },
      minDate,
    );
    expect(result).toEqual(baseDate);
  });

  it('работает с edge case - все секунды отключены для первой минуты', () => {
    const disableDates: DateTimePropDisableDates = [
      new Date(1970, 0, 1, 5, 0, 0),
      new Date(1970, 0, 1, 5, 0, 15),
      new Date(1970, 0, 1, 5, 0, 30),
      new Date(1970, 0, 1, 5, 0, 45),
    ];
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [5],
        minutes: [0, 30],
        seconds: [0, 15, 30, 45],
      },
      undefined,
      undefined,
      disableDates,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 5, 30, 0));
  });

  it('работает с edge case - сложная комбинация ограничений', () => {
    const minDate = new Date(1970, 0, 1, 9, 30, 16);
    const maxDate = new Date(1970, 0, 1, 11, 0, 15);
    const disableDates: DateTimePropDisableDates = [
      new Date(1970, 0, 1, 9, 30, 30),
      new Date(1970, 0, 1, 9, 30, 45),
      [new Date(1970, 0, 1, 9, 45, 0), new Date(1970, 0, 1, 9, 45, 45)],
      [new Date(1970, 0, 1, 10, 0, 0), new Date(1970, 0, 1, 10, 45, 30)],
    ];
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [9, 10, 11],
        minutes: [0, 30, 45],
        seconds: [0, 15, 30],
      },
      minDate,
      maxDate,
      disableDates,
    );
    expect(result).toEqual(new Date(1970, 0, 1, 11, 0, 0));
  });

  it('возвращает startOfDay когда нет ни одного валидного времени', () => {
    const minDate = new Date(1970, 0, 1, 21, 0, 0);
    const result = getFirstValidDateTime(
      baseDate,
      {
        hours: [20],
      },
      minDate,
    );
    expect(result).toEqual(baseDate);
  });
});

import ruLocale from 'date-fns/locale/ru';

import { getYearsOfDecade } from '../helpers';

describe('DateTime/getYearsOfDecade', () => {
  it('верный результат c date', () => {
    const result = getYearsOfDecade({
      date: new Date(1970, 0),
      locale: ruLocale,
    });

    const expected: typeof result = [
      { label: '1969', disabled: true },
      {
        label: '1970',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1971',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1972',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1973',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1974',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1975',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1976',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1977',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1978',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1979',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      { label: '1980', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с minDate и maxDate', () => {
    const result = getYearsOfDecade({
      date: new Date(1970, 0),
      locale: ruLocale,
      minDate: new Date(1974, 0),
      maxDate: new Date(1978, 0),
    });

    const expected: typeof result = [
      { label: '1969', disabled: true },
      {
        label: '1970',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: '1971',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: '1972',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: '1973',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: '1974',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1975',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1976',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1977',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1978',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1979',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      { label: '1980', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с events', () => {
    const result = getYearsOfDecade({
      date: new Date(1970, 0),
      locale: ruLocale,
      events: [
        new Date(1970, 0, 1),
        new Date(1970, 0, 2),
        new Date(1974, 0, 3),
        new Date(1976, 5, 3),
      ],
    });

    const expected: typeof result = [
      { label: '1969', disabled: true },
      {
        label: '1970',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: '1971',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1972',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1973',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1974',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: '1975',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1976',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: '1977',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1978',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1979',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      { label: '1980', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:Date', () => {
    const result = getYearsOfDecade({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: new Date(1975, 0, 3),
    });

    const expected: typeof result = [
      { label: '1969', disabled: true },
      {
        label: '1970',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1971',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1972',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1973',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1974',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1975',
        selected: true,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1976',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1977',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1978',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1979',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      { label: '1980', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:DateRange', () => {
    const result = getYearsOfDecade({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1973, 0, 3), new Date(1976, 5, 7)],
    });

    const expected: typeof result = [
      { label: '1969', disabled: true },
      {
        label: '1970',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1971',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1972',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1973',
        selected: true,
        range: 'first',
        current: false,
        disabled: false,
      },
      {
        label: '1974',
        selected: false,
        range: true,
        current: false,
        disabled: false,
      },
      {
        label: '1975',
        selected: false,
        range: true,
        current: false,
        disabled: false,
      },
      {
        label: '1976',
        selected: true,
        range: 'last',
        current: false,
        disabled: false,
      },
      {
        label: '1977',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1978',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: '1979',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      { label: '1980', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с множеством данных', () => {
    const result = getYearsOfDecade({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1974, 3, 3), new Date(1978, 5, 20)],
      minDate: new Date(1971, 2, 2),
      maxDate: new Date(1979, 8, 10),
      events: [
        new Date(1975, 1, 3),
        new Date(1974, 1, 5),
        new Date(1970, 5, 7),
        new Date(1977, 5, 11),
        new Date(1974, 2, 22),
      ],
    });

    const expected: typeof result = [
      { label: '1969', disabled: true },
      {
        label: '1970',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: true,
      },
      {
        label: '1971',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1972',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1973',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1974',
        selected: true,
        range: 'first',
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: '1975',
        selected: false,
        range: true,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: '1976',
        selected: false,
        range: true,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1977',
        selected: false,
        range: true,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: '1978',
        selected: true,
        range: 'last',
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: '1979',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      { label: '1980', disabled: true },
    ];

    expect(result).toEqual(expected);
  });
});

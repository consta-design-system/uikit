import enUSLocale from 'date-fns/locale/en-US';
import ruLocale from 'date-fns/locale/ru';

import { getMonthsOfYear } from '../helpers';

describe('DateTime/getMonthsOfYear', () => {
  it('верный результат c date', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: ruLocale,
    });

    const expected: typeof result = [
      {
        label: 'янв',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'фев',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'март',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'апр',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'май',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июнь',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июль',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'авг',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'сент',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'окт',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'нояб',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'дек',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с minDate и maxDate', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: ruLocale,
      minDate: new Date(1970, 3, 1),
      maxDate: new Date(1970, 7, 30),
    });

    const expected: typeof result = [
      {
        label: 'янв',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: 'фев',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: 'март',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: 'апр',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'май',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июнь',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июль',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'авг',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'сент',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: 'окт',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: 'нояб',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
      {
        label: 'дек',
        selected: false,
        range: false,
        current: false,
        disabled: true,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с events', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: ruLocale,
      events: [
        new Date(1970, 0, 1),
        new Date(1970, 0, 2),
        new Date(1970, 0, 3),
        new Date(1970, 5, 3),
      ],
    });

    const expected: typeof result = [
      {
        label: 'янв',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: 'фев',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'март',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'апр',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'май',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июнь',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: 'июль',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'авг',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'сент',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'окт',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'нояб',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'дек',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:Date', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: new Date(1970, 0, 3),
    });

    const expected: typeof result = [
      {
        label: 'янв',
        selected: true,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'фев',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'март',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'апр',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'май',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июнь',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июль',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'авг',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'сент',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'окт',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'нояб',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'дек',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:DateRange', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1970, 0, 3), new Date(1970, 5, 7)],
    });

    const expected: typeof result = [
      {
        label: 'янв',
        selected: true,
        range: 'first',
        current: false,
        disabled: false,
      },
      {
        label: 'фев',
        selected: false,
        range: true,
        current: false,
        disabled: false,
      },
      {
        label: 'март',
        selected: false,
        range: true,
        current: false,
        disabled: false,
      },
      {
        label: 'апр',
        selected: false,
        range: true,
        current: false,
        disabled: false,
      },
      {
        label: 'май',
        selected: false,
        range: true,
        current: false,
        disabled: false,
      },
      {
        label: 'июнь',
        selected: true,
        range: 'last',
        current: false,
        disabled: false,
      },
      {
        label: 'июль',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'авг',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'сент',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'окт',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'нояб',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'дек',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с locale = en-US', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: enUSLocale,
    });

    const expected: typeof result = [
      {
        label: 'Jan',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Feb',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Mar',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Apr',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'May',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Jun',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Jul',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Aug',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Sep',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Oct',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Nov',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
      {
        label: 'Dec',
        selected: false,
        range: false,
        current: false,
        disabled: false,
      },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с множеством данных', () => {
    const result = getMonthsOfYear({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1970, 3, 3), new Date(1970, 5, 20)],
      minDate: new Date(1970, 2, 2),
      maxDate: new Date(1970, 8, 10),
      events: [
        new Date(1970, 1, 3),
        new Date(1970, 1, 5),
        new Date(1970, 5, 7),
        new Date(1970, 5, 11),
        new Date(1970, 2, 22),
      ],
    });

    const expected: typeof result = [
      {
        label: 'янв',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: true,
      },
      {
        label: 'фев',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: true,
      },
      {
        label: 'март',
        selected: false,
        range: false,
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: 'апр',
        selected: true,
        range: 'first',
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'май',
        selected: false,
        range: true,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'июнь',
        selected: true,
        range: 'last',
        event: true,
        current: false,
        disabled: false,
      },
      {
        label: 'июль',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'авг',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'сент',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: false,
      },
      {
        label: 'окт',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: true,
      },
      {
        label: 'нояб',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: true,
      },
      {
        label: 'дек',
        selected: false,
        range: false,
        event: false,
        current: false,
        disabled: true,
      },
    ];

    expect(result).toEqual(expected);
  });
});

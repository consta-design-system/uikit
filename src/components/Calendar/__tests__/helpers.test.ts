import enUSLocale from 'date-fns/locale/en-US';
import ruLocale from 'date-fns/locale/ru';

import { getDaysOfMonth } from '../helpers';

describe('getDaysOfMonth', () => {
  it('верный результат c date', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
    });

    const expected: typeof result = [
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, today: false, disabled: false },
      { number: '2', selected: false, range: false, today: false, disabled: false },
      { number: '3', selected: false, range: false, today: false, disabled: false },
      { number: '4', selected: false, range: false, today: false, disabled: false },
      { number: '5', selected: false, range: false, today: false, disabled: false },
      { number: '6', selected: false, range: false, today: false, disabled: false },
      { number: '7', selected: false, range: false, today: false, disabled: false },
      { number: '8', selected: false, range: false, today: false, disabled: false },
      { number: '9', selected: false, range: false, today: false, disabled: false },
      { number: '10', selected: false, range: false, today: false, disabled: false },
      { number: '11', selected: false, range: false, today: false, disabled: false },
      { number: '12', selected: false, range: false, today: false, disabled: false },
      { number: '13', selected: false, range: false, today: false, disabled: false },
      { number: '14', selected: false, range: false, today: false, disabled: false },
      { number: '15', selected: false, range: false, today: false, disabled: false },
      { number: '16', selected: false, range: false, today: false, disabled: false },
      { number: '17', selected: false, range: false, today: false, disabled: false },
      { number: '18', selected: false, range: false, today: false, disabled: false },
      { number: '19', selected: false, range: false, today: false, disabled: false },
      { number: '20', selected: false, range: false, today: false, disabled: false },
      { number: '21', selected: false, range: false, today: false, disabled: false },
      { number: '22', selected: false, range: false, today: false, disabled: false },
      { number: '23', selected: false, range: false, today: false, disabled: false },
      { number: '24', selected: false, range: false, today: false, disabled: false },
      { number: '25', selected: false, range: false, today: false, disabled: false },
      { number: '26', selected: false, range: false, today: false, disabled: false },
      { number: '27', selected: false, range: false, today: false, disabled: false },
      { number: '28', selected: false, range: false, today: false, disabled: false },
      { number: '29', selected: false, range: false, today: false, disabled: false },
      { number: '30', selected: false, range: false, today: false, disabled: false },
      { number: '31', selected: false, range: false, today: false, disabled: false },
      { number: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с minDate и maxDate', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      minDate: new Date(1970, 0, 3),
      maxDate: new Date(1970, 0, 4),
    });

    const expected: typeof result = [
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, today: false, disabled: true },
      { number: '2', selected: false, range: false, today: false, disabled: true },
      { number: '3', selected: false, range: false, today: false, disabled: false },
      { number: '4', selected: false, range: false, today: false, disabled: false },
      { number: '5', selected: false, range: false, today: false, disabled: true },
      { number: '6', selected: false, range: false, today: false, disabled: true },
      { number: '7', selected: false, range: false, today: false, disabled: true },
      { number: '8', selected: false, range: false, today: false, disabled: true },
      { number: '9', selected: false, range: false, today: false, disabled: true },
      { number: '10', selected: false, range: false, today: false, disabled: true },
      { number: '11', selected: false, range: false, today: false, disabled: true },
      { number: '12', selected: false, range: false, today: false, disabled: true },
      { number: '13', selected: false, range: false, today: false, disabled: true },
      { number: '14', selected: false, range: false, today: false, disabled: true },
      { number: '15', selected: false, range: false, today: false, disabled: true },
      { number: '16', selected: false, range: false, today: false, disabled: true },
      { number: '17', selected: false, range: false, today: false, disabled: true },
      { number: '18', selected: false, range: false, today: false, disabled: true },
      { number: '19', selected: false, range: false, today: false, disabled: true },
      { number: '20', selected: false, range: false, today: false, disabled: true },
      { number: '21', selected: false, range: false, today: false, disabled: true },
      { number: '22', selected: false, range: false, today: false, disabled: true },
      { number: '23', selected: false, range: false, today: false, disabled: true },
      { number: '24', selected: false, range: false, today: false, disabled: true },
      { number: '25', selected: false, range: false, today: false, disabled: true },
      { number: '26', selected: false, range: false, today: false, disabled: true },
      { number: '27', selected: false, range: false, today: false, disabled: true },
      { number: '28', selected: false, range: false, today: false, disabled: true },
      { number: '29', selected: false, range: false, today: false, disabled: true },
      { number: '30', selected: false, range: false, today: false, disabled: true },
      { number: '31', selected: false, range: false, today: false, disabled: true },
      { number: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с events', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      events: [new Date(1970, 0, 1), new Date(1970, 0, 2), new Date(1970, 0, 3)],
    });

    const expected: typeof result = [
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, event: true, today: false, disabled: false },
      { number: '2', selected: false, range: false, event: true, today: false, disabled: false },
      { number: '3', selected: false, range: false, event: true, today: false, disabled: false },
      { number: '4', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '5', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '6', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '7', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '8', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '9', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '10', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '11', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '12', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '13', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '14', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '15', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '16', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '17', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '18', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '19', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '20', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '21', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '22', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '23', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '24', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '25', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '26', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '27', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '28', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '29', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '30', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '31', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:Date', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: new Date(1970, 0, 3),
    });

    const expected: typeof result = [
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, today: false, disabled: false },
      { number: '2', selected: false, range: false, today: false, disabled: false },
      { number: '3', selected: true, range: false, today: false, disabled: false },
      { number: '4', selected: false, range: false, today: false, disabled: false },
      { number: '5', selected: false, range: false, today: false, disabled: false },
      { number: '6', selected: false, range: false, today: false, disabled: false },
      { number: '7', selected: false, range: false, today: false, disabled: false },
      { number: '8', selected: false, range: false, today: false, disabled: false },
      { number: '9', selected: false, range: false, today: false, disabled: false },
      { number: '10', selected: false, range: false, today: false, disabled: false },
      { number: '11', selected: false, range: false, today: false, disabled: false },
      { number: '12', selected: false, range: false, today: false, disabled: false },
      { number: '13', selected: false, range: false, today: false, disabled: false },
      { number: '14', selected: false, range: false, today: false, disabled: false },
      { number: '15', selected: false, range: false, today: false, disabled: false },
      { number: '16', selected: false, range: false, today: false, disabled: false },
      { number: '17', selected: false, range: false, today: false, disabled: false },
      { number: '18', selected: false, range: false, today: false, disabled: false },
      { number: '19', selected: false, range: false, today: false, disabled: false },
      { number: '20', selected: false, range: false, today: false, disabled: false },
      { number: '21', selected: false, range: false, today: false, disabled: false },
      { number: '22', selected: false, range: false, today: false, disabled: false },
      { number: '23', selected: false, range: false, today: false, disabled: false },
      { number: '24', selected: false, range: false, today: false, disabled: false },
      { number: '25', selected: false, range: false, today: false, disabled: false },
      { number: '26', selected: false, range: false, today: false, disabled: false },
      { number: '27', selected: false, range: false, today: false, disabled: false },
      { number: '28', selected: false, range: false, today: false, disabled: false },
      { number: '29', selected: false, range: false, today: false, disabled: false },
      { number: '30', selected: false, range: false, today: false, disabled: false },
      { number: '31', selected: false, range: false, today: false, disabled: false },
      { number: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с value:DateRange', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1970, 0, 3), new Date(1970, 0, 7)],
    });

    const expected: typeof result = [
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, today: false, disabled: false },
      { number: '2', selected: false, range: false, today: false, disabled: false },
      { number: '3', selected: true, range: 'first', today: false, disabled: false },
      { number: '4', selected: false, range: true, today: false, disabled: false },
      { number: '5', selected: false, range: true, today: false, disabled: false },
      { number: '6', selected: false, range: true, today: false, disabled: false },
      { number: '7', selected: true, range: 'last', today: false, disabled: false },
      { number: '8', selected: false, range: false, today: false, disabled: false },
      { number: '9', selected: false, range: false, today: false, disabled: false },
      { number: '10', selected: false, range: false, today: false, disabled: false },
      { number: '11', selected: false, range: false, today: false, disabled: false },
      { number: '12', selected: false, range: false, today: false, disabled: false },
      { number: '13', selected: false, range: false, today: false, disabled: false },
      { number: '14', selected: false, range: false, today: false, disabled: false },
      { number: '15', selected: false, range: false, today: false, disabled: false },
      { number: '16', selected: false, range: false, today: false, disabled: false },
      { number: '17', selected: false, range: false, today: false, disabled: false },
      { number: '18', selected: false, range: false, today: false, disabled: false },
      { number: '19', selected: false, range: false, today: false, disabled: false },
      { number: '20', selected: false, range: false, today: false, disabled: false },
      { number: '21', selected: false, range: false, today: false, disabled: false },
      { number: '22', selected: false, range: false, today: false, disabled: false },
      { number: '23', selected: false, range: false, today: false, disabled: false },
      { number: '24', selected: false, range: false, today: false, disabled: false },
      { number: '25', selected: false, range: false, today: false, disabled: false },
      { number: '26', selected: false, range: false, today: false, disabled: false },
      { number: '27', selected: false, range: false, today: false, disabled: false },
      { number: '28', selected: false, range: false, today: false, disabled: false },
      { number: '29', selected: false, range: false, today: false, disabled: false },
      { number: '30', selected: false, range: false, today: false, disabled: false },
      { number: '31', selected: false, range: false, today: false, disabled: false },
      { number: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с locale = en-US', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: enUSLocale,
    });

    const expected: typeof result = [
      { number: '28', disabled: true },
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, today: false, disabled: false },
      { number: '2', selected: false, range: false, today: false, disabled: false },
      { number: '3', selected: false, range: false, today: false, disabled: false },
      { number: '4', selected: false, range: false, today: false, disabled: false },
      { number: '5', selected: false, range: false, today: false, disabled: false },
      { number: '6', selected: false, range: false, today: false, disabled: false },
      { number: '7', selected: false, range: false, today: false, disabled: false },
      { number: '8', selected: false, range: false, today: false, disabled: false },
      { number: '9', selected: false, range: false, today: false, disabled: false },
      { number: '10', selected: false, range: false, today: false, disabled: false },
      { number: '11', selected: false, range: false, today: false, disabled: false },
      { number: '12', selected: false, range: false, today: false, disabled: false },
      { number: '13', selected: false, range: false, today: false, disabled: false },
      { number: '14', selected: false, range: false, today: false, disabled: false },
      { number: '15', selected: false, range: false, today: false, disabled: false },
      { number: '16', selected: false, range: false, today: false, disabled: false },
      { number: '17', selected: false, range: false, today: false, disabled: false },
      { number: '18', selected: false, range: false, today: false, disabled: false },
      { number: '19', selected: false, range: false, today: false, disabled: false },
      { number: '20', selected: false, range: false, today: false, disabled: false },
      { number: '21', selected: false, range: false, today: false, disabled: false },
      { number: '22', selected: false, range: false, today: false, disabled: false },
      { number: '23', selected: false, range: false, today: false, disabled: false },
      { number: '24', selected: false, range: false, today: false, disabled: false },
      { number: '25', selected: false, range: false, today: false, disabled: false },
      { number: '26', selected: false, range: false, today: false, disabled: false },
      { number: '27', selected: false, range: false, today: false, disabled: false },
      { number: '28', selected: false, range: false, today: false, disabled: false },
      { number: '29', selected: false, range: false, today: false, disabled: false },
      { number: '30', selected: false, range: false, today: false, disabled: false },
      { number: '31', selected: false, range: false, today: false, disabled: false },
    ];

    expect(result).toEqual(expected);
  });

  it('верный результат с множеством данных', () => {
    const result = getDaysOfMonth({
      date: new Date(1970, 0),
      locale: ruLocale,
      value: [new Date(1970, 0, 3), new Date(1970, 0, 20)],
      minDate: new Date(1970, 0, 2),
      maxDate: new Date(1970, 0, 10),
      events: [
        new Date(1970, 0, 3),
        new Date(1970, 0, 5),
        new Date(1970, 0, 7),
        new Date(1970, 0, 11),
        new Date(1970, 0, 22),
      ],
    });

    const expected: typeof result = [
      { number: '29', disabled: true },
      { number: '30', disabled: true },
      { number: '31', disabled: true },
      { number: '1', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '2', selected: false, range: false, event: false, today: false, disabled: false },
      { number: '3', selected: true, range: 'first', event: true, today: false, disabled: false },
      { number: '4', selected: false, range: true, event: false, today: false, disabled: false },
      { number: '5', selected: false, range: true, event: true, today: false, disabled: false },
      { number: '6', selected: false, range: true, event: false, today: false, disabled: false },
      { number: '7', selected: false, range: true, event: true, today: false, disabled: false },
      { number: '8', selected: false, range: true, event: false, today: false, disabled: false },
      { number: '9', selected: false, range: true, event: false, today: false, disabled: false },
      { number: '10', selected: false, range: true, event: false, today: false, disabled: false },
      { number: '11', selected: false, range: true, event: true, today: false, disabled: true },
      { number: '12', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '13', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '14', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '15', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '16', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '17', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '18', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '19', selected: false, range: true, event: false, today: false, disabled: true },
      { number: '20', selected: true, range: 'last', event: false, today: false, disabled: true },
      { number: '21', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '22', selected: false, range: false, event: true, today: false, disabled: true },
      { number: '23', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '24', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '25', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '26', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '27', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '28', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '29', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '30', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '31', selected: false, range: false, event: false, today: false, disabled: true },
      { number: '1', disabled: true },
    ];

    expect(result).toEqual(expected);
  });
});

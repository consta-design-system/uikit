import MockDate from 'mockdate';

import {
  getCurrentVisibleDate,
  getMonthTitle,
  isDateFullyEntered,
  isDateIsInvalid,
  isDateRange,
  isOnlyOneDateInRange,
  makeQuartersRanges,
} from '../helpers';
import { DateRange } from '../types';

describe('isDateRange', () => {
  it('не опознает используемое значение как интервал, если оно не передано', () => {
    expect(isDateRange(undefined)).toBe(false);
  });

  it('не опознает используемое значение как интервал, если передана дата', () => {
    expect(isDateRange(new Date())).toBe(false);
  });

  it('не опознает используемое значение как интервал, если передан пустой контейнер', () => {
    expect(isDateRange([])).toBe(false);
  });

  it('не опознает используемое значение как интервал, если передан контейнер с одной датой', () => {
    expect(isDateRange([new Date()])).toBe(false);
  });

  it('опознает используемое значение как интервал, если передан контейнер с двумя пустыми значениями', () => {
    expect(isDateRange([undefined, undefined])).toBe(true);
  });

  it('опознает используемое значение как интервал, если передан контейнер с одним пустым значением и одной датой', () => {
    expect(isDateRange([new Date(), undefined])).toBe(true);
    expect(isDateRange([undefined, new Date()])).toBe(true);
  });

  it('опознает используемое значение как интервал, если передан контейнер с двумя датами', () => {
    expect(isDateRange([new Date(), new Date()])).toBe(true);
  });
});

describe('getCurrentVisibleDate', () => {
  const currentDate = new Date(2020, 4, 15);

  beforeAll(() => {
    return MockDate.set(currentDate);
  });

  afterAll(() => {
    return MockDate.reset();
  });

  describe('если значение не задано', () => {
    it('возвращает текущую дату, если её месяц полностью входит в разрешенные границы', () => {
      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 3, 1),
          maxDate: new Date(2020, 5, 1),
        }),
      ).toEqual(currentDate);
    });

    it('возвращает минимальную дату, если текущая выходит за минимальную границу', () => {
      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 4, 16),
          maxDate: new Date(2020, 5, 14),
        }),
      ).toEqual(new Date(2020, 4, 16));
    });

    it('возвращает максимальную дату, если текущая выходит за максимальную границу', () => {
      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 2, 16),
          maxDate: new Date(2020, 4, 14),
        }),
      ).toEqual(new Date(2020, 4, 14));
    });

    it('возвращает минимальную дату, если месяц текущей заканчивается ранее минимальной', () => {
      const minDate = new Date(2020, 5, 15);

      expect(
        getCurrentVisibleDate({
          minDate,
          maxDate: new Date(2020, 6, 15),
        }),
      ).toEqual(minDate);
    });

    it('возвращает максимальную дату, если месяц текущей начинается позже максимальной', () => {
      const maxDate = new Date(2020, 3, 15);

      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 2, 15),
          maxDate,
        }),
      ).toEqual(maxDate);
    });
  });

  describe('если значение задано', () => {
    const minDate = new Date(2020, 2, 15);
    const maxDate = new Date(2020, 6, 15);

    it('возвращает выбранную дату, если она задана', () => {
      const value = new Date(2020, 2, 25);

      expect(
        getCurrentVisibleDate({
          value,
          minDate,
          maxDate,
        }),
      ).toEqual(value);
    });

    describe('если значение - диапазон дат', () => {
      const rangeStart = new Date(2020, 2, 15);
      const rangeEnd = new Date(2020, 2, 25);

      it('возвращает конец диапазона, если заданы начало и конец', () => {
        expect(
          getCurrentVisibleDate({
            minDate,
            maxDate,
            value: [rangeStart, rangeEnd],
          }),
        ).toEqual(rangeEnd);
      });

      it('возвращает начало диапазона, если задано только начало', () => {
        expect(
          getCurrentVisibleDate({
            minDate,
            maxDate,
            value: [rangeStart, undefined],
          }),
        ).toEqual(rangeStart);
      });

      it('возвращает конец диапазона, если задан только конец', () => {
        expect(
          getCurrentVisibleDate({
            minDate,
            maxDate,
            value: [undefined, rangeEnd],
          }),
        ).toEqual(rangeEnd);
      });

      describe('если не заданы начало и конец', () => {
        it('возвращает текущую дату, если она полностью входит в разрешенные границы', () => {
          expect(
            getCurrentVisibleDate({
              minDate,
              maxDate,
              value: [undefined, undefined],
            }),
          ).toEqual(currentDate);
        });

        it('возвращает минимальную дату, если текущая выходит за минимальную границу', () => {
          expect(
            getCurrentVisibleDate({
              minDate: new Date(2020, 4, 16),
              maxDate,
              value: [undefined, undefined],
            }),
          ).toEqual(new Date(2020, 4, 16));
        });

        it('возвращает максимальную дату, если текущая выходит за максимальную границу', () => {
          expect(
            getCurrentVisibleDate({
              minDate,
              maxDate: new Date(2020, 4, 14),
              value: [undefined, undefined],
            }),
          ).toEqual(new Date(2020, 4, 14));
        });

        it('возвращает минимальную дату, если месяц текущей заканчивается ранее минимальной', () => {
          const minDateRange = new Date(2020, 5, 15);

          expect(
            getCurrentVisibleDate({
              minDate: minDateRange,
              maxDate,
              value: [undefined, undefined],
            }),
          ).toEqual(minDateRange);
        });

        it('возвращает максимальную дату, если месяц текущей начинается позже максимальной', () => {
          const maxDateRange = new Date(2020, 3, 15);

          expect(
            getCurrentVisibleDate({
              minDate: new Date(2020, 2, 15),
              maxDate: maxDateRange,
              value: [undefined, undefined],
            }),
          ).toEqual(maxDateRange);
        });
      });
    });
  });
});

describe('getMonthTitle', () => {
  it('возвращает название месяца в русской локали', () => {
    expect(getMonthTitle(new Date(2020, 0, 1))).toEqual('январь');
  });
});

describe('isDateIsInvalid', () => {
  it('не срабатывает, если дата не введена', () => {
    expect(
      isDateIsInvalid({ minDate: new Date(2020, 2, 15), maxDate: new Date(2020, 3, 15) }),
    ).toBe(false);
  });

  it('не срабатывает, если переданная дата введена не полностью', () => {
    expect(
      isDateIsInvalid({
        date: new Date(''),
        minDate: new Date('2020-01-15'),
        maxDate: new Date('2020-02-15'),
      }),
    ).toBe(false);

    expect(
      isDateIsInvalid({
        date: new Date('20-01-22'),
        minDate: new Date('2020-01-15'),
        maxDate: new Date('2020-02-15'),
      }),
    ).toBe(false);
  });

  it('определяет, что передана существующая дата', () => {
    expect(
      isDateIsInvalid({
        date: new Date(2020, 1, 28),
        minDate: new Date(2020, 1, 15),
        maxDate: new Date(2020, 2, 15),
      }),
    ).toBe(false);
  });

  it('не определяет, что передана несуществующая дата', () => {
    expect(
      isDateIsInvalid({
        date: new Date(2020, 1, 31),
        minDate: new Date(2020, 1, 15),
        maxDate: new Date(2020, 2, 15),
      }),
    ).toBe(false);
  });

  it('определяет, что переданная дата входит в разрешенные пределы', () => {
    expect(
      isDateIsInvalid({
        date: new Date(2020, 2, 15),
        minDate: new Date(2020, 1, 15),
        maxDate: new Date(2020, 2, 15),
      }),
    ).toBe(false);
  });

  it('определяет, что переданная дата выходит за разрешенные пределы', () => {
    expect(
      isDateIsInvalid({
        date: new Date(2020, 2, 22),
        minDate: new Date(2020, 1, 15),
        maxDate: new Date(2020, 2, 15),
      }),
    ).toBe(true);
  });
});

describe('isOnlyOneDateInRange', () => {
  it('возвращает false, если в интервале нет дат', () => {
    expect(isOnlyOneDateInRange([undefined, undefined])).toBeFalsy();
  });

  it('возвращает false, если в интервале указаны обе даты', () => {
    expect(isOnlyOneDateInRange([new Date(), new Date()])).toBeFalsy();
  });

  it('возвращает true, если в интервале указана только первая дата', () => {
    expect(isOnlyOneDateInRange([new Date(), undefined])).toBeTruthy();
  });

  it('возвращает true, если в интервале указана только вторая дата', () => {
    expect(isOnlyOneDateInRange([undefined, new Date()])).toBeTruthy();
  });
});

describe('isFullyEnteredDate', () => {
  it('возвращает false, если дата введена не полностью', () => {
    const result = isDateFullyEntered(new Date('0002-01-01'));

    expect(result).toBe(false);
  });

  it('возвращает true, если дата введена полностью', () => {
    const result = isDateFullyEntered(new Date('2020-01-01'));

    expect(result).toBe(true);
  });

  it('возвращает false, если диапазон дат не заполнен', () => {
    const result = isDateFullyEntered([undefined, undefined]);

    expect(result).toBe(false);
  });

  it('возвращает false, если не полностью заполнена только одна дата из диапазона', () => {
    const firstDate = isDateFullyEntered([new Date('0002-01-01'), undefined]);
    expect(firstDate).toBe(false);

    const lastDate = isDateFullyEntered([undefined, new Date('0002-01-01')]);
    expect(lastDate).toBe(false);
  });

  it('возвращает true, если полностью заполнена только одна дата из диапазона', () => {
    const firstDate = isDateFullyEntered([new Date('2020-01-01'), undefined]);
    expect(firstDate).toBe(true);

    const lastDate = isDateFullyEntered([undefined, new Date('2020-01-01')]);
    expect(lastDate).toBe(true);
  });

  it('возвращает false, если не полностью заполнена любая дата из диапазона', () => {
    const result = isDateFullyEntered([new Date('2020-01-01'), new Date('2020-01-01')]);

    expect(result).toBe(true);
  });

  it('возвращает true, если полностью заполнены все даты из диапазон', () => {
    const result = isDateFullyEntered([new Date('2020-01-01'), new Date('2020-01-01')]);

    expect(result).toBe(true);
  });
});

describe('makeQuartersRanges', () => {
  const START_OF_DAY = [0, 0, 0, 0] as const;
  const END_OF_DAY = [23, 59, 59, 999] as const;

  const QUARTERS_START_AND_END: DateRange[] = [
    [new Date(2019, 0, 1, ...START_OF_DAY), new Date(2019, 2, 31, ...END_OF_DAY)],
    [new Date(2019, 3, 1, ...START_OF_DAY), new Date(2019, 5, 30, ...END_OF_DAY)],
    [new Date(2019, 6, 1, ...START_OF_DAY), new Date(2019, 8, 30, ...END_OF_DAY)],
    [new Date(2019, 9, 1, ...START_OF_DAY), new Date(2019, 11, 31, ...END_OF_DAY)],
  ];
  const date = new Date(2019, 0, 1);

  it('возвращает полные кварталы для всего года', () => {
    const quarters = makeQuartersRanges({
      date,
      minDate: new Date(2019, 0, 1, ...START_OF_DAY),
      maxDate: new Date(2019, 11, 31, ...END_OF_DAY),
    });

    expect(quarters).toEqual([
      { title: '1 кв. 2019', range: QUARTERS_START_AND_END[0] },
      { title: '2 кв. 2019', range: QUARTERS_START_AND_END[1] },
      { title: '3 кв. 2019', range: QUARTERS_START_AND_END[2] },
      { title: '4 кв. 2019', range: QUARTERS_START_AND_END[3] },
    ]);
  });

  it('возвращает неполные кварталы если они частично выходят за минимальную или максимальную даты', () => {
    const quarters = makeQuartersRanges({
      date,
      minDate: new Date(2019, 2, 1, ...START_OF_DAY),
      maxDate: new Date(2019, 11, 1, ...END_OF_DAY),
    });
    expect(quarters).toEqual([
      {
        title: '1 кв. 2019',
        range: [new Date(2019, 2, 1, ...START_OF_DAY), new Date(2019, 2, 31, ...END_OF_DAY)],
      },
      { title: '2 кв. 2019', range: QUARTERS_START_AND_END[1] },
      { title: '3 кв. 2019', range: QUARTERS_START_AND_END[2] },
      {
        title: '4 кв. 2019',
        range: [new Date(2019, 9, 1, ...START_OF_DAY), new Date(2019, 11, 1, ...END_OF_DAY)],
      },
    ]);
  });

  it('возвращает пустые массивы для кварталов которые полностью выходят за минимальную или максимальную даты', () => {
    const quarters = makeQuartersRanges({
      date,
      minDate: new Date(2019, 3, 1, ...START_OF_DAY),
      maxDate: new Date(2019, 8, 30, ...END_OF_DAY),
    });

    expect(quarters).toEqual([
      {
        title: '1 кв. 2019',
        range: [],
      },
      { title: '2 кв. 2019', range: QUARTERS_START_AND_END[1] },
      { title: '3 кв. 2019', range: QUARTERS_START_AND_END[2] },
      {
        title: '4 кв. 2019',
        range: [],
      },
    ]);
  });
});

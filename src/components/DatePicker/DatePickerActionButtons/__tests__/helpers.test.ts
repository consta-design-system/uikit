import { DateRange } from '../../types';
import { getQuarters } from '../helpers';

const START_OF_DAY = [0, 0, 0, 0] as const;
const END_OF_DAY = [23, 59, 59, 999] as const;

const QUARTERS_START_AND_END: DateRange[] = [
  [new Date(2019, 0, 1, ...START_OF_DAY), new Date(2019, 2, 31, ...END_OF_DAY)],
  [new Date(2019, 3, 1, ...START_OF_DAY), new Date(2019, 5, 30, ...END_OF_DAY)],
  [new Date(2019, 6, 1, ...START_OF_DAY), new Date(2019, 8, 30, ...END_OF_DAY)],
  [new Date(2019, 9, 1, ...START_OF_DAY), new Date(2019, 11, 31, ...END_OF_DAY)],
];

describe('getQuarters', () => {
  const date = new Date(2019, 0, 1);

  it('возвращает полные кварталы для всего года', () => {
    const quarters = getQuarters({
      date,
      minDate: new Date(2019, 0, 1, ...START_OF_DAY),
      maxDate: new Date(2019, 11, 31, ...END_OF_DAY),
    });

    expect(quarters).toEqual(QUARTERS_START_AND_END);
  });

  it('возвращает неполные кварталы если они частично выходят за минимальную или максимальную даты', () => {
    const quarters = getQuarters({
      date,
      minDate: new Date(2019, 2, 1, ...START_OF_DAY),
      maxDate: new Date(2019, 11, 1, ...END_OF_DAY),
    });

    expect(quarters).toEqual([
      [new Date(2019, 2, 1, ...START_OF_DAY), new Date(2019, 2, 31, ...END_OF_DAY)],
      QUARTERS_START_AND_END[1],
      QUARTERS_START_AND_END[2],
      [new Date(2019, 9, 1, ...START_OF_DAY), new Date(2019, 11, 1, ...END_OF_DAY)],
    ]);
  });

  it('возвращает пустые массивы для кварталов которые полностью выходят за минимальную или максимальную даты', () => {
    const quarters = getQuarters({
      date,
      minDate: new Date(2019, 3, 1, ...START_OF_DAY),
      maxDate: new Date(2019, 8, 30, ...END_OF_DAY),
    });

    expect(quarters).toEqual([[], QUARTERS_START_AND_END[1], QUARTERS_START_AND_END[2], []]);
  });
});

import {
  getDateMidnightFromString,
  getInputValue,
  isDateFromInputIsFullyEntered,
  isParsedFromInputDateExists,
} from '../helpers';

describe('getInputValue', () => {
  it('не возвращает значение даты, если она не передана', () => {
    expect(getInputValue()).toEqual('');
  });

  it('не возвращает значение даты, если она не валидна', () => {
    expect(getInputValue(new Date(''))).toEqual('');
  });

  it('возвращает форматированное значение даты, если она существует', () => {
    expect(getInputValue(new Date('2020-01-01'))).toEqual('2020-01-01');
  });

  it('возвращает форматированное значение даты, если она не существует', () => {
    expect(getInputValue(new Date('2020-02-31'))).toEqual('2020-03-02');
  });
});

describe('getDateMidnightFromString', () => {
  it('возвращает невалидную дату, если её значение невалидно', () => {
    expect(Number.isNaN(getDateMidnightFromString('').valueOf())).toBe(true);
  });

  it('возвращает валидную дату, если она существует', () => {
    expect(getDateMidnightFromString('2020-01-01')).toEqual(new Date('2020-01-01T00:00:00'));
  });

  it('возвращает валидную дату, если она не существует', () => {
    expect(getDateMidnightFromString('2020-02-31')).toEqual(new Date('2020-03-02T00:00:00'));
  });
});

describe('isParsedFromInputDateExists', () => {
  it('определяет, что введенная дата существует', () => {
    expect(isParsedFromInputDateExists('2020-01-01')).toBe(true);
  });

  it('определяет, что введенная дата не существует', () => {
    expect(isParsedFromInputDateExists('')).toBe(false);
  });
});

describe('isDateFromInputIsFullyEntered', () => {
  it('определяет, что дата введена полностью', () => {
    expect(isDateFromInputIsFullyEntered(new Date('2020-01-01'))).toBe(true);
  });

  it('определяет, что дата введена не полностью', () => {
    expect(isDateFromInputIsFullyEntered(new Date('20-01-01'))).toBe(false);
    expect(isDateFromInputIsFullyEntered(new Date(''))).toBe(false);
  });
});

import {
  getBaseDate,
  getDateOffsetOnTimeline,
  getMonths,
  getSelectedBlockStyles,
  getSelectedDayWidth,
} from '../helpers';

const TICK_WIDTH = 20;

describe('getMonths', () => {
  it('возвращает месяцы, приходящиеся на переданный диапазон', () => {
    expect(
      getMonths({
        minDate: new Date('2020-01-10T00:00:00'),
        maxDate: new Date('2020-02-20T00:00:00'),
      }),
    ).toEqual([new Date('2020-01-10T00:00:00'), new Date('2020-02-10T00:00:00')]);
  });

  it('возвращает месяцы, приходящиеся на переданный диапазон, при диапазоне менее месяца', () => {
    expect(
      getMonths({
        minDate: new Date('2019-12-25T00:00:00'),
        maxDate: new Date('2020-01-05T00:00:00'),
      }),
    ).toEqual([new Date('2019-12-25T00:00:00'), new Date('2020-01-25T00:00:00')]);
  });

  it('возвращает одну дату, если переданный диапазон приходится на один календарный месяц', () => {
    expect(
      getMonths({
        minDate: new Date('2020-01-10T00:00:00'),
        maxDate: new Date('2020-01-20T00:00:00'),
      }),
    ).toEqual([new Date('2020-01-10T00:00:00')]);
  });
});

describe('getBaseDate', () => {
  it('возвращает первую дату, если она есть в переданном диапазоне', () => {
    const firstDate = new Date(2020, 0, 1);
    const secondDate = new Date(2020, 1, 1);

    expect(getBaseDate([firstDate, secondDate])).toEqual(firstDate);
  });

  it('возвращает вторую дату, если первой даты нет в переданном диапазоне', () => {
    const secondDate = new Date(2020, 1, 1);

    expect(getBaseDate([undefined, secondDate])).toEqual(secondDate);
  });

  it('не возвращает дату, если передан пустой диапазон', () => {
    expect(getBaseDate([undefined, undefined])).toEqual(undefined);
  });

  it('не возвращает дату, если не передан диапазон', () => {
    expect(getBaseDate()).toEqual(undefined);
  });
});

describe('getDateOffsetOnTimeline', () => {
  it('возвращает отступ периода, если выбранная и минимальная дата находятся в одном и том же годе и месяце', () => {
    const date = new Date(2020, 2, 28);
    const minDate = new Date(2020, 2, 11);

    expect(
      getDateOffsetOnTimeline({
        date,
        minDate,
        tickWidth: TICK_WIDTH,
      }),
    ).toEqual(18);
  });

  it('возвращает отступ периода, если выбранная и минимальная дата находятся в одном и том же годе и разных месяцах с разницей менее месяца', () => {
    const date = new Date(2019, 1, 8);
    const minDate = new Date(2019, 0, 25);

    expect(
      getDateOffsetOnTimeline({
        date,
        minDate,
        tickWidth: TICK_WIDTH,
      }),
    ).toEqual(26);
  });

  it('возвращает отступ периода, если выбранная и минимальная дата находятся в одном и том же годе и разных месяцах с разницей более месяца', () => {
    const date = new Date(2019, 2, 8);
    const minDate = new Date(2019, 0, 1);

    expect(
      getDateOffsetOnTimeline({
        date,
        minDate,
        tickWidth: TICK_WIDTH,
      }),
    ).toEqual(45);
  });

  it('возвращает отступ периода, если выбранная и минимальная дата находятся в разных годах с разницей менее месяца', () => {
    const date = new Date(2020, 0, 1);
    const minDate = new Date(2019, 11, 31);

    expect(
      getDateOffsetOnTimeline({
        date,
        minDate,
        tickWidth: TICK_WIDTH,
      }),
    ).toEqual(21);
  });

  it('возвращает отступ периода, если выбранная и минимальная дата находятся в разных годах с разницей более месяца', () => {
    const date = new Date(2020, 2, 1);
    const minDate = new Date(2019, 11, 31);

    expect(
      getDateOffsetOnTimeline({
        date,
        minDate,
        tickWidth: TICK_WIDTH,
      }),
    ).toEqual(61);
  });

  it('возвращает отступ периода, если выбранная и минимальная дата находятся в разных годах с разницей более года', () => {
    const date = new Date(2021, 0, 1);
    const minDate = new Date(2019, 11, 31);

    expect(
      getDateOffsetOnTimeline({
        date,
        minDate,
        tickWidth: TICK_WIDTH,
      }),
    ).toEqual(261);
  });
});

describe('getSelectedDayWidth', () => {
  it('возвращает число, равное доле 1 дня месяца в ширине тика, соответствующего месяцу этого числа', () => {
    expect(getSelectedDayWidth(new Date(2020, 0, 1), 155)).toEqual(5);
  });

  it('не возвращает дробные значения', () => {
    expect(getSelectedDayWidth(new Date(2020, 0, 1), 156)).toEqual(5);
  });

  it('возвращает 1 для результатов вычислений менее 1', () => {
    expect(getSelectedDayWidth(new Date(2020, 0, 1), 10)).toEqual(1);
  });
});

describe('getSelectedBlockStyles', () => {
  it('возвращает ширину и отступ для полного диапазона', () => {
    expect(
      getSelectedBlockStyles({
        value: [new Date(2020, 1, 1), new Date(2020, 2, 1)],
        minDate: new Date(2020, 0, 1),
        tickWidth: 10,
      }),
    ).toEqual({ width: 11, left: 10 });
  });

  it('возвращает ширину и отступ для полного диапазона, дата начала которого сопадает с началом года', () => {
    expect(
      getSelectedBlockStyles({
        value: [new Date(2020, 0, 1), new Date(2020, 2, 1)],
        minDate: new Date(2020, 0, 1),
        tickWidth: 10,
      }),
    ).toEqual({ width: 21, left: 0 });
  });

  it('возвращает ширину и отступ для диапазона c указанной только первой датой', () => {
    expect(
      getSelectedBlockStyles({
        value: [new Date(2020, 1, 1), undefined],
        minDate: new Date(2020, 0, 1),
        tickWidth: 10,
      }),
    ).toEqual({ width: 1, left: 10 });
  });

  it('возвращает ширину и отступ для диапазона c указанной только второй датой', () => {
    expect(
      getSelectedBlockStyles({
        value: [undefined, new Date(2020, 2, 1)],
        minDate: new Date(2020, 0, 1),
        tickWidth: 10,
      }),
    ).toEqual({ width: 1, left: 20 });
  });

  it('возвращает нулевую ширину для диапазона без дат', () => {
    expect(
      getSelectedBlockStyles({
        value: [undefined, undefined],
        minDate: new Date(2020, 0, 1),
        tickWidth: 10,
      }),
    ).toEqual({ width: 0 });
  });

  it('возвращает нулевую ширину при отсутствии диапазона', () => {
    expect(
      getSelectedBlockStyles({
        value: undefined,
        minDate: new Date(2020, 0, 1),
        tickWidth: 10,
      }),
    ).toEqual({ width: 0 });
  });
});

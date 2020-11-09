import { DateRange } from '../../../utils/types/Date';
import { isDateHighlighted, isValueSelected, isValueSelectedBackwards } from '../Calendar';

describe('isValueSelected', () => {
  describe('переданное значение - одна дата', () => {
    it('возвращает true, если значение календарно совпадает с переданной датой', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 2),
          value: new Date(2019, 0, 2),
        }),
      ).toBeTruthy();
    });

    it('возвращет false, если значение календарно не совпадает с переданной датой', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 2),
          value: new Date(2019, 0, 3),
        }),
      ).toBeFalsy();
    });

    it('возвращет false, если значение не задано', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 2),
          value: undefined,
        }),
      ).toBeFalsy();
    });
  });

  describe('переданное значение - диапазон дат', () => {
    const range: DateRange = [new Date(2019, 0, 10), new Date(2019, 0, 12)];

    it('возвращает true, если значение представлено полностью и дата календарно в пределах этого значения', () => {
      expect(isValueSelected({ date: new Date(2019, 0, 11), value: range })).toBeTruthy();
    });

    it('возвращает true, если первая дата значения позже второй', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 11),
          value: [range[1], range[0]],
        }),
      ).toBeTruthy();
    });

    it('возвращает true, если значение представлено полностью и дата календарно на границах этого значения', () => {
      expect(isValueSelected({ date: range[0]!, value: range })).toBeTruthy();
      expect(isValueSelected({ date: range[1]!, value: range })).toBeTruthy();
    });

    it('возвращает false, если значение представлено полностью и дата календарно за пределами этого значения', () => {
      expect(isValueSelected({ date: new Date(2019, 0, 13), value: range })).toBeFalsy();
    });

    it('возвращает true, если значение представлено одной датой и дата календарно совпадает с ней', () => {
      expect(isValueSelected({ date: range[0]!, value: [range[0], undefined] })).toBeTruthy();
      expect(isValueSelected({ date: range[1]!, value: [undefined, range[1]] })).toBeTruthy();
    });

    it('возвращает false, если значение представлено одной датой и дата календарно не совпадает с ней', () => {
      expect(isValueSelected({ date: range[1]!, value: [range[0], undefined] })).toBeFalsy();
      expect(isValueSelected({ date: range[0]!, value: [undefined, range[1]] })).toBeFalsy();
    });

    it('возвращет false, если значение не задано', () => {
      expect(isValueSelected({ date: new Date(2019, 0, 10), value: undefined })).toBeFalsy();
      expect(
        isValueSelected({ date: new Date(2019, 0, 10), value: [undefined, undefined] }),
      ).toBeFalsy();
    });
  });
});

describe('isDateHighlighted', () => {
  it('возвращает false, если не передана наведенная дата', () => {
    expect(isDateHighlighted({ date: new Date(), value: [new Date(), new Date()] })).toBeFalsy();
  });

  it('возвращает false, если value не является интервалом', () => {
    expect(
      isDateHighlighted({
        date: new Date(2015, 1, 1),
        hoveredDate: new Date(2014, 1, 1),
        value: new Date(2018, 1, 1),
      }),
    ).toBeFalsy();
  });

  it('возвращает false, если в переданном интервале не одна дата', () => {
    expect(
      isDateHighlighted({
        date: new Date(2015, 1, 1),
        hoveredDate: new Date(2014, 1, 1),
        value: [new Date(2018, 1, 1), new Date(2020, 1, 1)],
      }),
    ).toBeFalsy();
  });

  it('возвращает false, если переданная дата не входит в интервал [наведенная дата, дата из переданного интервала]', () => {
    expect(
      isDateHighlighted({
        date: new Date(2012, 1, 1),
        hoveredDate: new Date(2014, 1, 1),
        value: [new Date(2018, 1, 1), undefined],
      }),
    ).toBeFalsy();
  });

  it('возвращает false, если переданная дата не входит в интервал [дата из переданного интервала, наведенная дата]', () => {
    expect(
      isDateHighlighted({
        date: new Date(2012, 1, 1),
        hoveredDate: new Date(2018, 1, 1),
        value: [undefined, new Date(2014, 1, 1)],
      }),
    ).toBeFalsy();
  });

  it('возвращает true, если переданная дата входит в интервал [наведенная дата, дата из переданного интервала]', () => {
    expect(
      isDateHighlighted({
        date: new Date(2015, 1, 1),
        hoveredDate: new Date(2014, 1, 1),
        value: [new Date(2018, 1, 1), undefined],
      }),
    ).toBeTruthy();
  });

  it('возвращает true, если переданная дата входит в интервал [дата из переданного интервала, наведенная дата]', () => {
    expect(
      isDateHighlighted({
        date: new Date(2015, 1, 1),
        hoveredDate: new Date(2018, 1, 1),
        value: [undefined, new Date(2014, 1, 1)],
      }),
    ).toBeTruthy();
  });
});

describe('isValueSelectedBackwards', () => {
  const date = new Date(2019, 0, 10);
  const range: DateRange = [new Date(2019, 0, 10), new Date(2019, 0, 12)];

  it('возвращает false, если не задана выбранная дата', () => {
    expect(isValueSelectedBackwards({ value: range })).toBeFalsy();
  });

  it('возвращает false, если не задан интервал', () => {
    expect(isValueSelectedBackwards({ hoveredDate: date })).toBeFalsy();
  });

  it('возвращает false, если переданное значение не является интервалом', () => {
    expect(
      isValueSelectedBackwards({ hoveredDate: date, value: new Date(2017, 0, 2) }),
    ).toBeFalsy();
  });

  it('возвращает false, если в переданном интервале не одна дата', () => {
    expect(isValueSelectedBackwards({ hoveredDate: date })).toBeFalsy();
    expect(
      isValueSelectedBackwards({ hoveredDate: date, value: [undefined, undefined] }),
    ).toBeFalsy();
    expect(isValueSelectedBackwards({ hoveredDate: date, value: range })).toBeFalsy();
  });

  it('возвращает false если переданная дата позже даты из интервала', () => {
    expect(
      isValueSelectedBackwards({
        hoveredDate: new Date(2017, 4, 1),
        value: [new Date(2017, 2, 1), undefined],
      }),
    ).toBeFalsy();

    expect(
      isValueSelectedBackwards({
        hoveredDate: new Date(2017, 4, 1),
        value: [undefined, new Date(2017, 2, 1)],
      }),
    ).toBeFalsy();
  });

  it('возвращает true если переданная дата раньше даты из интервала', () => {
    expect(
      isValueSelectedBackwards({
        hoveredDate: new Date(2016, 4, 1),
        value: [new Date(2017, 2, 1), undefined],
      }),
    ).toBeTruthy();

    expect(
      isValueSelectedBackwards({
        hoveredDate: new Date(2016, 4, 1),
        value: [undefined, new Date(2017, 2, 1)],
      }),
    ).toBeTruthy();
  });
});

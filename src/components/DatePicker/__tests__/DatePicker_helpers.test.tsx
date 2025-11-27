import { addHours, addMinutes, addSeconds, startOfToday } from 'date-fns';
import { IMask } from 'react-imask';

import { TimeOptions } from '##/components/DateTime';
import {
  getLabelHours,
  getLabelMinutes,
  getLabelSeconds,
} from '##/components/DateTime/helpers';

import {
  datePickerPropFormatTypeDateTime,
  duplicateSingleDecadeValues,
  getAdaptedFormatByTimeOptions,
  getTimeMaskBlocks,
  getTimeOptionsByFormat,
} from '../helpers';

describe('DateTime helpers (time)', () => {
  describe('getTimeOptionsByFormat', () => {
    it('возвращает переданные TimeOptions, если формат содержит HH:mm:ss', () => {
      const timeOptions: TimeOptions = {
        hours: { step: 2 },
        minutes: { step: 5 },
        seconds: [0, 15, 30, 45],
      };

      const result = getTimeOptionsByFormat(
        datePickerPropFormatTypeDateTime,
        timeOptions,
      );

      expect(result.hours).toEqual({ step: 2 });
      expect(result.minutes).toEqual({ step: 5 });
      expect(result.seconds).toEqual([0, 15, 30, 45]);
    });

    it('обнуляет опции для тех частей времени, которых нет в формате', () => {
      const timeOptions: TimeOptions = {
        hours: { step: 2 },
        minutes: { step: 5 },
        seconds: { step: 10 },
      };

      const format = 'dd.MM.yyyy HH:mm';
      const result = getTimeOptionsByFormat(format, timeOptions);

      expect(result.hours).toEqual({ step: 2 });
      expect(result.minutes).toEqual({ step: 5 });
      expect(result.seconds).toEqual([]);
    });

    it('возвращает undefined, если TimeOptions не передан', () => {
      const result = getTimeOptionsByFormat(
        datePickerPropFormatTypeDateTime,
        undefined,
      );

      expect(result.hours).toEqual(undefined);
      expect(result.minutes).toEqual(undefined);
      expect(result.seconds).toEqual(undefined);
    });

    it('корректно работает с частичным форматом (только часы)', () => {
      const timeOptions: TimeOptions = {
        hours: { start: 0, stop: 12 },
        minutes: [0, 30],
        seconds: [0, 15, 30, 45],
      };

      const format = 'dd.MM.yyyy HH';
      const result = getTimeOptionsByFormat(format, timeOptions);

      expect(result.hours).toEqual({ start: 0, stop: 12 });
      expect(result.minutes).toEqual([]);
      expect(result.seconds).toEqual([]);
    });

    it('неполный timeOptions и полный format', () => {
      const timeOptions: TimeOptions = {
        hours: { step: 1 },
        minutes: { step: 5 },
      };

      const format = 'dd.MM.yyyy HH:mm:ss';

      const result = getTimeOptionsByFormat(format, timeOptions);

      expect(result.hours).toEqual({ step: 1 });
      expect(result.minutes).toEqual({ step: 5 });
      expect(result.seconds).toEqual(undefined);
    });

    it('неполный timeOptions и неполный format', () => {
      const timeOptions: TimeOptions = {
        hours: { step: 1 },
        minutes: { step: 5 },
      };

      const format = 'dd.MM.yyyy HH:mm';

      const result = getTimeOptionsByFormat(format, timeOptions);

      expect(result.hours).toEqual({ step: 1 });
      expect(result.minutes).toEqual({ step: 5 });
      expect(result.seconds).toEqual([]);
    });
  });

  describe('duplicateSingleDecadeValues — дублирование одиночных значений в десятках', () => {
    it('возвращает пустой массив, если на вход подан пустой массив', () => {
      expect(duplicateSingleDecadeValues([])).toEqual([]);
    });

    it('дублирует значение, если оно единственное в своём десятке', () => {
      expect(duplicateSingleDecadeValues([7])).toEqual([7, 7]);
    });

    it('не дублирует значения, если в десятке больше одного значения', () => {
      expect(duplicateSingleDecadeValues([10, 11, 12])).toEqual([10, 11, 12]);
    });

    it('дублирует только те десятки, в которых ровно одно значение', () => {
      expect(duplicateSingleDecadeValues([3, 15, 20, 29])).toEqual([
        3, 3, 15, 15, 20, 29,
      ]);
    });

    it('сохраняет порядок значений внутри десятка', () => {
      expect(duplicateSingleDecadeValues([21, 23, 15, 10])).toEqual([
        21, 23, 15, 10,
      ]);
    });

    it('корректно работает на границах десятков (9 → 10)', () => {
      expect(duplicateSingleDecadeValues([9, 10])).toEqual([9, 9, 10, 10]);
    });

    it('не меняет порядок самих десятков — только дублирует значения', () => {
      expect(duplicateSingleDecadeValues([20, 3, 40])).toEqual([
        20, 20, 3, 3, 40, 40,
      ]);
    });
  });

  describe('getTimeMaskBlocks', () => {
    function expectMaskedRange(block: any, from: number, to: number) {
      expect(block.mask).toBe(IMask.MaskedRange);
      expect(block.from).toBe(from);
      expect(block.to).toBe(to);
    }

    function expectMaskedEnum(block: any, expectedEnum: string[]) {
      expect(block.mask).toBe(IMask.MaskedEnum);
      expect(block.enum).toEqual(expectedEnum);
    }

    it('возвращает полный диапазон, если timeOptions не переданы', () => {
      const result = getTimeMaskBlocks();
      expectMaskedRange(result.HH, 0, 23);
      expectMaskedRange(result.mm, 0, 59);
      expectMaskedRange(result.ss, 0, 59);
    });

    it('корректно обрабатывает пустой массив', () => {
      const result = getTimeMaskBlocks({ hours: [], minutes: [], seconds: [] });
      expectMaskedRange(result.HH, 0, 23);
      expectMaskedRange(result.mm, 0, 59);
      expectMaskedRange(result.ss, 0, 59);
    });

    it('корректно обрабатывает объект { start, stop, step }', () => {
      const timeOptions = { hours: { start: 0, stop: 6, step: 2 } };
      const result = getTimeMaskBlocks(timeOptions);
      const expectedEnum = [0, 2, 4, 6].map((h) =>
        getLabelHours(addHours(startOfToday(), h)),
      );
      expectMaskedEnum(result.HH, expectedEnum);
    });

    it('корректно работает с массивом кастомных значений', () => {
      const timeOptions = { minutes: [0, 15, 30, 45] };
      const result = getTimeMaskBlocks(timeOptions);
      const expectedEnum = [0, 0, 15, 15, 30, 30, 45, 45].map((m) =>
        getLabelMinutes(addMinutes(startOfToday(), m)),
      );
      expectMaskedEnum(result.mm, expectedEnum);
    });

    it('корректно обрабатывает stop = 0', () => {
      const timeOptions = { seconds: { start: 0, stop: 0, step: 1 } };
      const result = getTimeMaskBlocks(timeOptions);
      const expectedEnum = [0, 0].map((s) =>
        getLabelSeconds(addSeconds(startOfToday(), s)),
      );
      expectMaskedEnum(result.ss, expectedEnum);
    });
  });

  describe('getAdaptedFormatByTimeOptions', () => {
    const numericFormat = 'dd.MM.yyyy HH:mm:ss';
    const placeholderFormat = 'ДД.ММ.ГГГГ ЧЧ:ММ:СС';

    describe('with numeric format (dd.MM.yyyy HH:mm:ss)', () => {
      it('удаляет часть времени, если timeOptions пустой или step=0', () => {
        const timeOptionsHoursEmpty = { hours: [] };
        const resultHoursEmpty = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsHoursEmpty,
        );
        expect(resultHoursEmpty).toBe('dd.MM.yyyy mm:ss');

        const timeOptionsHoursStep0 = { minutes: { step: 0 } };
        const resultHoursStep0 = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsHoursStep0,
        );
        expect(resultHoursStep0).toBe('dd.MM.yyyy HH:ss');

        const timeOptionsAllEmpty = { hours: [], minutes: [], seconds: [] };
        const resultAllEmpty = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsAllEmpty,
        );
        expect(resultAllEmpty).toBe('dd.MM.yyyy');
      });

      it('не меняет формат, если опции полные timeOptions', () => {
        const timeOptionsFull = {
          hours: [0, 12],
          minutes: [0, 30],
          seconds: [0, 45],
        };
        const resultTimeOptions = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsFull,
        );
        expect(resultTimeOptions).toBe(numericFormat);
      });
    });

    describe('with placeholder format (ДД.ММ.ГГГГ ЧЧ:ММ:СС)', () => {
      it('удаляет часть времени, если timeOptions пустой или step=0', () => {
        const timeOptionsHoursEmpty = { hours: [] };
        const resultHoursEmpty = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          timeOptionsHoursEmpty,
        );
        expect(resultHoursEmpty).toBe('ДД.ММ.ГГГГ ММ:СС');

        const timeOptionsHoursStep0 = { hours: { step: 0 } };
        const resultHoursStep0 = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          timeOptionsHoursStep0,
        );
        expect(resultHoursStep0).toBe('ДД.ММ.ГГГГ ММ:СС');

        const timeOptionsAllEmpty = { hours: [], minutes: [], seconds: [] };
        const resultAllEmpty = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          timeOptionsAllEmpty,
        );
        expect(resultAllEmpty).toBe('ДД.ММ.ГГГГ');
      });

      it('не меняет формат, если опции полные timeOptions', () => {
        const timeOptionsFull = {
          hours: [0, 12],
          minutes: [0, 30],
          seconds: [0, 45],
        };
        const resultTimeOptions = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          timeOptionsFull,
        );
        expect(resultTimeOptions).toBe(placeholderFormat);
      });
    });
  });
});

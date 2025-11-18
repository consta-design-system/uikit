import {
  addHours,
  addMinutes,
  addSeconds,
  startOfDay,
  startOfToday,
} from 'date-fns';
import { IMask } from 'react-imask';

import { TimeOptions } from '##/components/DateTime';
import {
  getLabelHours,
  getLabelMinutes,
  getLabelSeconds,
} from '##/components/DateTime/helpers';

import {
  datePickerPropFormatTypeDateTime,
  getAdaptedFormatByTimeOptions,
  getMultiplicityTime,
  getTimeEnum,
  getTimeMaskBlocks,
  getTimeOptionsByFormat,
} from '../helpers';

describe('DateTime helpers (time)', () => {
  describe('getMultiplicityTime', () => {
    it('возвращает переданные multiplicity, если формат содержит HH:mm:ss', () => {
      const [h, m, s] = getMultiplicityTime(
        datePickerPropFormatTypeDateTime,
        2,
        5,
        10,
      );

      expect(h).toBe(2);
      expect(m).toBe(5);
      expect(s).toBe(10);
    });

    it('обнуляет multiplicity для тех частей времени, которых нет в формате', () => {
      const format = 'dd.MM.yyyy HH:mm';

      const [h, m, s] = getMultiplicityTime(format, 2, 5, 10);

      expect(h).toBe(2);
      expect(m).toBe(5);
      expect(s).toBe(0);
    });

    it('возвращает undefined для частей, если multiplicity не передан и маркер присутствует в формате', () => {
      const [h, m, s] = getMultiplicityTime(
        datePickerPropFormatTypeDateTime,
        undefined,
        undefined,
        undefined,
      );

      expect(h).toBeUndefined();
      expect(m).toBeUndefined();
      expect(s).toBeUndefined();
    });

    it('возвращает 0, если маркера времени нет в формате', () => {
      const format = 'dd.MM.yyyy';

      const [h, m, s] = getMultiplicityTime(format, 2, 5, 10);

      expect(h).toBe(0);
      expect(m).toBe(0);
      expect(s).toBe(0);
    });
  });

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
      const expectedEnum = [0, 15, 30, 45].map((m) =>
        getLabelMinutes(addMinutes(startOfToday(), m)),
      );
      expectMaskedEnum(result.mm, expectedEnum);
    });

    it('корректно обрабатывает stop = 0', () => {
      const timeOptions = { seconds: { start: 0, stop: 0, step: 1 } };
      const result = getTimeMaskBlocks(timeOptions);
      const expectedEnum = [0].map((s) =>
        getLabelSeconds(addSeconds(startOfToday(), s)),
      );
      expectMaskedEnum(result.ss, expectedEnum);
    });

    it('корректно использует multiplicity, если timeOptions не переданы (deprecated)', () => {
      const result = getTimeMaskBlocks(undefined, 2, 15, 30);

      const expectedHoursEnum = Array.from({ length: 12 }, (_, i) =>
        getLabelHours(addHours(startOfToday(), i * 2)),
      );
      const expectedMinutesEnum = Array.from({ length: 4 }, (_, i) =>
        getLabelMinutes(addMinutes(startOfToday(), i * 15)),
      );
      const expectedSecondsEnum = Array.from({ length: 2 }, (_, i) =>
        getLabelSeconds(addSeconds(startOfToday(), i * 30)),
      );

      expectMaskedEnum(result.HH, expectedHoursEnum);
      expectMaskedEnum(result.mm, expectedMinutesEnum);
      expectMaskedEnum(result.ss, expectedSecondsEnum);
    });

    it('приоритет timeOptions над multiplicity', () => {
      const timeOptions = { hours: [0, 6, 12], seconds: [0, 15, 30, 45] };
      const result = getTimeMaskBlocks(timeOptions, 2, undefined, 10);

      const expectedHoursEnum = [0, 6, 12].map((h) =>
        getLabelHours(addHours(startOfToday(), h)),
      );
      const expectedSecondsEnum = [0, 15, 30, 45].map((s) =>
        getLabelSeconds(addSeconds(startOfToday(), s)),
      );

      expectMaskedEnum(result.HH, expectedHoursEnum);
      expectMaskedRange(result.mm, 0, 59);
      expectMaskedEnum(result.ss, expectedSecondsEnum);
    });

    it('комбинированный случай: mix options и multiplicity', () => {
      const timeOptions = { hours: [0, 6, 12] };
      const result = getTimeMaskBlocks(timeOptions, undefined, undefined, 15);
      const expectedHoursEnum = [0, 6, 12].map((h) =>
        getLabelHours(addHours(startOfToday(), h)),
      );
      const expectedSecondsEnum = [0, 15, 30, 45].map((s) =>
        getLabelSeconds(addSeconds(startOfToday(), s)),
      );
      expectMaskedEnum(result.HH, expectedHoursEnum);
      expectMaskedRange(result.mm, 0, 59);
      expectMaskedEnum(result.ss, expectedSecondsEnum);
    });
  });

  describe('getTimeEnum', () => {
    it('возвращает пустой массив, если multiplicity = 0', () => {
      const result = getTimeEnum(24, 0, startOfDay, addHours, (date) =>
        date.toISOString(),
      );

      expect(result).toEqual([]);
    });

    it('возвращает все значения при multiplicity = 1', () => {
      const result = getTimeEnum(24, 1, startOfDay, addHours, (date) =>
        date.toISOString(),
      );

      expect(result).toHaveLength(24);
    });

    it('делает шаг по multiplicity (например, 2 часа: 00, 02, 04, ...)', () => {
      const result = getTimeEnum(24, 2, startOfDay, addHours, (date) => {
        const hours = date.getHours();
        return hours.toString().padStart(2, '0');
      });

      expect(result).toEqual([
        '00',
        '02',
        '04',
        '06',
        '08',
        '10',
        '12',
        '14',
        '16',
        '18',
        '20',
        '22',
      ]);
    });
  });

  describe('getAdaptedFormatByTimeOptions', () => {
    const numericFormat = 'dd.MM.yyyy HH:mm:ss';
    const placeholderFormat = 'ДД.ММ.ГГГГ ЧЧ:ММ:СС';

    describe('with numeric format (dd.MM.yyyy HH:mm:ss)', () => {
      it('удаляет часть времени, если multiplicity = 0 (timeOptions undefined)', () => {
        const resultHours = getAdaptedFormatByTimeOptions(
          numericFormat,
          undefined,
          0,
        );
        expect(resultHours).toBe('dd.MM.yyyy mm:ss');

        const resultMinutes = getAdaptedFormatByTimeOptions(
          numericFormat,
          undefined,
          undefined,
          0,
        );
        expect(resultMinutes).toBe('dd.MM.yyyy HH:ss');

        const resultSeconds = getAdaptedFormatByTimeOptions(
          numericFormat,
          undefined,
          undefined,
          undefined,
          0,
        );
        expect(resultSeconds).toBe('dd.MM.yyyy HH:mm');

        const resultAll = getAdaptedFormatByTimeOptions(
          numericFormat,
          undefined,
          0,
          0,
          0,
        );
        expect(resultAll).toBe('dd.MM.yyyy');
      });

      it('удаляет часть времени, если timeOptions пустой или step=0 (multiplicity undefined)', () => {
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

      it('приоритет timeOptions над multiplicity (удаление по timeOptions, игнор multiplicity)', () => {
        const timeOptionsHoursEmpty = { hours: [] };
        const result = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsHoursEmpty,
          2,
        );
        expect(result).toBe('dd.MM.yyyy mm:ss');

        const timeOptionsSecondsStep0 = { seconds: { step: 0 } };
        const resultSeconds = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsSecondsStep0,
          undefined,
          undefined,
          10,
        );
        expect(resultSeconds).toBe('dd.MM.yyyy HH:mm');
      });

      it('не меняет формат, если опции полные (multiplicity или timeOptions)', () => {
        const resultMultiplicity = getAdaptedFormatByTimeOptions(
          numericFormat,
          undefined,
          2,
          5,
          10,
        );
        expect(resultMultiplicity).toBe(numericFormat);

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

        const timeOptionsPart = { minutes: [0, 30], seconds: [0, 45] };
        const resultTimeOptionsPart = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsPart,
          2,
        );
        expect(resultTimeOptionsPart).toBe(numericFormat);
      });
    });

    describe('with placeholder format (ДД.ММ.ГГГГ ЧЧ:ММ:СС)', () => {
      it('удаляет часть времени, если multiplicity = 0 (timeOptions undefined)', () => {
        const resultHours = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          undefined,
          0,
        );
        expect(resultHours).toBe('ДД.ММ.ГГГГ ММ:СС');

        const resultMinutes = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          undefined,
          undefined,
          0,
        );
        expect(resultMinutes).toBe('ДД.ММ.ГГГГ ЧЧ:СС');

        const resultSeconds = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          undefined,
          undefined,
          undefined,
          0,
        );
        expect(resultSeconds).toBe('ДД.ММ.ГГГГ ЧЧ:ММ');

        const resultAll = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          undefined,
          0,
          0,
          0,
        );
        expect(resultAll).toBe('ДД.ММ.ГГГГ');
      });

      it('удаляет часть времени, если timeOptions пустой или step=0 (multiplicity undefined)', () => {
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

      it('приоритет timeOptions над multiplicity (удаление по timeOptions, игнор multiplicity)', () => {
        const timeOptionsHoursEmpty = { hours: [] };
        const result = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          timeOptionsHoursEmpty,
          2,
        );
        expect(result).toBe('ДД.ММ.ГГГГ ММ:СС');

        const timeOptionsSecondsStep0 = { seconds: { step: 0 } };
        const resultSeconds = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          timeOptionsSecondsStep0,
          undefined,
          undefined,
          10,
        );
        expect(resultSeconds).toBe('ДД.ММ.ГГГГ ЧЧ:ММ');
      });

      it('не меняет формат, если опции полные (multiplicity или timeOptions)', () => {
        const resultMultiplicity = getAdaptedFormatByTimeOptions(
          placeholderFormat,
          undefined,
          2,
          5,
          10,
        );
        expect(resultMultiplicity).toBe(placeholderFormat);

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

        const timeOptionsPart = { minutes: [0, 30], seconds: [0, 45] };
        const resultTimeOptionsPart = getAdaptedFormatByTimeOptions(
          numericFormat,
          timeOptionsPart,
          2,
        );
        expect(resultTimeOptionsPart).toBe(numericFormat);
      });
    });
  });
});

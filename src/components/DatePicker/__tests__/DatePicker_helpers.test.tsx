import { IMask } from 'react-imask';

import { TimeOptions } from '##/components/DateTime';

import {
  datePickerPropFormatTypeDateTime,
  getAdaptedFormatByTimeOptions,
  getMaskBlocks,
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

  describe('getMaskBlocks', () => {
    const expectMaskedRange = (block: any, from: number, to: number) => {
      expect(block.mask).toBe(IMask.MaskedRange);
      expect(block.from).toBe(from);
      expect(block.to).toBe(to);
    };

    describe('возвращает блоки для даты и времени по умолчанию', () => {
      it('включает и дату, и время при вызове без параметров', () => {
        const result = getMaskBlocks();

        expect(result.dd).toBeDefined();
        expectMaskedRange(result.dd, 1, 31);

        expect(result.MM).toBeDefined();
        expectMaskedRange(result.MM, 1, 12);

        expect(result.yyyy).toBeDefined();
        expectMaskedRange(result.yyyy, 1, 9999);

        expect(result.HH).toBeDefined();
        expectMaskedRange(result.HH, 0, 23);

        expect(result.mm).toBeDefined();
        expectMaskedRange(result.mm, 0, 59);

        expect(result.ss).toBeDefined();
        expectMaskedRange(result.ss, 0, 59);
      });

      it('включает и дату, и время при явном указании', () => {
        const result = getMaskBlocks({ includeDate: true, includeTime: true });

        expect(result.dd).toBeDefined();
        expect(result.MM).toBeDefined();
        expect(result.yyyy).toBeDefined();
        expect(result.HH).toBeDefined();
        expect(result.mm).toBeDefined();
        expect(result.ss).toBeDefined();
      });
    });

    describe('возвращает только блоки для даты', () => {
      it('при includeDate: true и includeTime: false', () => {
        const result = getMaskBlocks({ includeDate: true, includeTime: false });

        expect(result.dd).toBeDefined();
        expectMaskedRange(result.dd, 1, 31);

        expect(result.MM).toBeDefined();
        expectMaskedRange(result.MM, 1, 12);

        expect(result.yyyy).toBeDefined();
        expectMaskedRange(result.yyyy, 1, 9999);

        expect(result.HH).toBeUndefined();
        expect(result.mm).toBeUndefined();
        expect(result.ss).toBeUndefined();
      });
    });

    describe('возвращает только блоки для времени', () => {
      it('при includeDate: false и includeTime: true', () => {
        const result = getMaskBlocks({ includeDate: false, includeTime: true });

        expect(result.dd).toBeUndefined();
        expect(result.MM).toBeUndefined();
        expect(result.yyyy).toBeUndefined();

        expect(result.HH).toBeDefined();
        expectMaskedRange(result.HH, 0, 23);

        expect(result.mm).toBeDefined();
        expectMaskedRange(result.mm, 0, 59);

        expect(result.ss).toBeDefined();
        expectMaskedRange(result.ss, 0, 59);
      });
    });

    describe('возвращает пустой объект', () => {
      it('при includeDate: false и includeTime: false', () => {
        const result = getMaskBlocks({
          includeDate: false,
          includeTime: false,
        });

        expect(result).toEqual({});
        expect(result.dd).toBeUndefined();
        expect(result.MM).toBeUndefined();
        expect(result.yyyy).toBeUndefined();
        expect(result.HH).toBeUndefined();
        expect(result.mm).toBeUndefined();
        expect(result.ss).toBeUndefined();
      });
    });

    describe('корректные диапазоны значений', () => {
      it('дни от 1 до 31', () => {
        const result = getMaskBlocks();
        expectMaskedRange(result.dd, 1, 31);
      });

      it('месяцы от 1 до 12', () => {
        const result = getMaskBlocks();
        expectMaskedRange(result.MM, 1, 12);
      });

      it('годы от 1 до 9999', () => {
        const result = getMaskBlocks();
        expectMaskedRange(result.yyyy, 1, 9999);
      });

      it('часы от 0 до 23', () => {
        const result = getMaskBlocks();
        expectMaskedRange(result.HH, 0, 23);
      });

      it('минуты от 0 до 59', () => {
        const result = getMaskBlocks();
        expectMaskedRange(result.mm, 0, 59);
      });

      it('секунды от 0 до 59', () => {
        const result = getMaskBlocks();
        expectMaskedRange(result.ss, 0, 59);
      });
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

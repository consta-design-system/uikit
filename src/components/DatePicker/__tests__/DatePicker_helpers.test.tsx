import { addHours, startOfDay } from 'date-fns';

import {
  datePickerPropFormatTypeDateTime,
  getMultiplicityTime,
  getTimeEnum,
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
});

import { getTimeNumbers } from '../helpers/getTimeNumbers';

describe('getTimeNumbers', () => {
  describe('проверка step (sequence from 0)', () => {
    const steps = [0, 1, 2, 5, 10];

    steps.forEach((step) => {
      it(`проверка timeOptions.hours.step = ${step}`, () => {
        const result = getTimeNumbers('hours', { step });
        if (step === 0) {
          expect(result).toEqual([]);
        } else {
          expect(result.length).toEqual(Math.ceil(24 / step));
          expect(result[0]).toBe(0);
          expect(result[1]).toBe(step);
        }
      });
    });

    steps.forEach((step) => {
      it(`проверка timeOptions.minutes.step = ${step}`, () => {
        const result = getTimeNumbers('minutes', { step });
        if (step === 0) {
          expect(result).toEqual([]);
        } else {
          expect(result.length).toEqual(Math.ceil(60 / step));
          expect(result[0]).toBe(0);
          expect(result[1]).toBe(step);
        }
      });
    });

    steps.forEach((step) => {
      it(`проверка timeOptions.seconds.step = ${step}`, () => {
        const result = getTimeNumbers('seconds', { step });
        if (step === 0) {
          expect(result).toEqual([]);
        } else {
          expect(result.length).toEqual(Math.ceil(60 / step));
          expect(result[0]).toBe(0);
          expect(result[1]).toBe(step);
        }
      });
    });
  });

  describe('проверка start', () => {
    const startValues1 = [-10, 0, 5, 10, 30];
    const startValues2 = [-10, 0, 5, 10, 30, 59, 60];

    startValues1.forEach((start) => {
      it(`проверка timeOptions.hours.start = ${start} (full stop=23, step=1)`, () => {
        const result = getTimeNumbers('hours', { start });
        const clampedStart = Math.max(0, Math.min(23, start));
        expect(result.length).toEqual(24 - clampedStart);
        expect(result[0]).toBe(clampedStart);
        expect(result[result.length - 1]).toBe(23);
      });
    });

    startValues2.forEach((start) => {
      it(`проверка timeOptions.minutes.start = ${start} (full stop=59, step=1)`, () => {
        const result = getTimeNumbers('minutes', { start });
        const clampedStart = Math.max(0, Math.min(59, start));
        expect(result.length).toEqual(60 - clampedStart);
        expect(result[0]).toBe(clampedStart);
        expect(result[result.length - 1]).toBe(59);
      });
    });

    startValues2.forEach((start) => {
      it(`проверка timeOptions.seconds.start = ${start} (full stop=59, step=1)`, () => {
        const result = getTimeNumbers('seconds', { start });
        const clampedStart = Math.max(0, Math.min(59, start));
        expect(result.length).toEqual(60 - clampedStart);
        expect(result[0]).toBe(clampedStart);
        expect(result[result.length - 1]).toBe(59);
      });
    });
  });

  describe('проверка timeOptions.stop (stop to N, start=0, step=1)', () => {
    const stopValues1 = [-5, 5, 10, 20, 30];
    const stopValues2 = [-10, 10, 20, 50, 70];

    stopValues1.forEach((stop) => {
      it(`проверка timeOptions.hours.stop = ${stop} (start=0, step=1)`, () => {
        const result = getTimeNumbers('hours', { stop });
        const clampedStop = Math.max(0, Math.min(23, stop));
        expect(result.length).toEqual(clampedStop + 1);
        expect(result[0]).toBe(0);
        expect(result[result.length - 1]).toBe(clampedStop);
      });
    });

    stopValues2.forEach((stop) => {
      it(`проверка timeOptions.minutes.stop = ${stop} (start=0, step=1)`, () => {
        const result = getTimeNumbers('minutes', { stop });
        const clampedStop = Math.max(0, Math.min(59, stop));
        expect(result.length).toEqual(clampedStop + 1);
        expect(result[0]).toBe(0);
        expect(result[result.length - 1]).toBe(clampedStop);
      });
    });

    stopValues2.forEach((stop) => {
      it(`проверка timeOptions.seconds.stop = ${stop} (start=0, step=1)`, () => {
        const result = getTimeNumbers('seconds', { stop });
        const clampedStop = Math.max(0, Math.min(59, stop));
        expect(result.length).toEqual(clampedStop + 1);
        expect(result[0]).toBe(0);
        expect(result[result.length - 1]).toBe(clampedStop);
      });
    });
  });

  describe('проверка start/stop/step комбинации', () => {
    it(`проверка timeOptions.hours.step=5, start=5, stop=15 (combination, no swap)`, () => {
      const result = getTimeNumbers('hours', { step: 5, start: 5, stop: 15 });
      expect(result).toEqual([5, 10, 15]);
    });

    it(`проверка timeOptions.hours.step=3, start=20, stop=10 (swap to 10-20)`, () => {
      const result = getTimeNumbers('hours', { step: 3, start: 20, stop: 10 });
      expect(result).toEqual([10, 13, 16, 19]);
    });

    it(`проверка timeOptions.hours.step=2, start=0, stop=30 (clamp stop=23)`, () => {
      const result = getTimeNumbers('hours', { step: 2, start: 0, stop: 30 });
      expect(result).toEqual([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]);
    });

    it(`проверка timeOptions.minutes.step=10, start=10, stop=50 (combination)`, () => {
      const result = getTimeNumbers('minutes', {
        step: 10,
        start: 10,
        stop: 50,
      });
      expect(result).toEqual([10, 20, 30, 40, 50]);
    });

    it(`проверка timeOptions.minutes.step=5, start=50, stop=20 (swap to 20-50)`, () => {
      const result = getTimeNumbers('minutes', {
        step: 5,
        start: 50,
        stop: 20,
      });
      expect(result).toEqual([20, 25, 30, 35, 40, 45, 50]);
    });

    it(`проверка timeOptions.minutes.step=10, start=-5, stop=70 (clamp start=0, stop=59)`, () => {
      const result = getTimeNumbers('minutes', {
        step: 10,
        start: -5,
        stop: 70,
      });
      expect(result).toEqual([0, 10, 20, 30, 40, 50]);
    });

    it(`проверка timeOptions.seconds.step=15, start=15, stop=45 (combination)`, () => {
      const result = getTimeNumbers('seconds', {
        step: 15,
        start: 15,
        stop: 45,
      });
      expect(result).toEqual([15, 30, 45]);
    });

    it(`проверка timeOptions.seconds.step=10, start=50, stop=20 (swap to 20-50)`, () => {
      const result = getTimeNumbers('seconds', {
        step: 10,
        start: 50,
        stop: 20,
      });
      expect(result).toEqual([20, 30, 40, 50]);
    });

    it(`проверка timeOptions.seconds.step=20, start=-10, stop=80 (clamp start=0, stop=59)`, () => {
      const result = getTimeNumbers('seconds', {
        step: 20,
        start: -10,
        stop: 80,
      });
      expect(result).toEqual([0, 20, 40]);
    });
  });

  describe('проверка custom timeOptions (кастомный список значений)', () => {
    it('корректный custom список для hours', () => {
      const result = getTimeNumbers('hours', [0, 1, 5, 10, 15, 23]);
      expect(result).toEqual([0, 1, 5, 10, 15, 23]);
    });

    it('повторы и числа вне диапазона для hours — фильтруются', () => {
      const result = getTimeNumbers('hours', [-5, 0, 0, 1, 10, 25, 40, 40]);
      expect(result).toEqual([0, 1, 10]);
    });

    it('пустой custom массив для hours — возвращает пустой массив', () => {
      const result = getTimeNumbers('hours', []);
      expect(result).toEqual([]);
    });

    it('корректный custom список для minutes', () => {
      const result = getTimeNumbers('minutes', [0, 5, 15, 30, 45]);
      expect(result).toEqual([0, 5, 15, 30, 45]);
    });

    it('повторы и вне диапазона minutes', () => {
      const result = getTimeNumbers('minutes', [-1, 0, 0, 30, 59, 60, 120, 60]);
      expect(result).toEqual([0, 30, 59]);
    });

    it('пустой custom для minutes — возвращает пустой массив', () => {
      const result = getTimeNumbers('minutes', []);
      expect(result).toEqual([]);
    });

    it('корректный custom список для seconds', () => {
      const result = getTimeNumbers('seconds', [0, 10, 23, 33, 40, 50]);
      expect(result).toEqual([0, 10, 23, 33, 40, 50]);
    });

    it('повторы и вне диапазона seconds', () => {
      const result = getTimeNumbers(
        'seconds',
        [-10, -10, 0, 0, 59, 59, 60, 100],
      );
      expect(result).toEqual([0, 59]);
    });

    it('пустой custom для seconds — возвращает пустой массив', () => {
      const result = getTimeNumbers('seconds', []);
      expect(result).toEqual([]);
    });

    it('undefined custom — fallback на стандартный диапазон', () => {
      const result = getTimeNumbers('seconds', {});
      expect(result.length).toEqual(60);
      expect(result[0]).toBe(0);
      expect(result[59]).toBe(59);
    });
  });

  describe('edge cases и специальные случаи', () => {
    it('возвращает полный диапазон при undefined options', () => {
      const result = getTimeNumbers('hours', undefined);
      expect(result.length).toBe(24);
    });

    it('возвращает полный диапазон при пустом объекте options', () => {
      const result = getTimeNumbers('hours', {});
      expect(result.length).toBe(24);
    });

    it('обрабатывает step=1 как полный диапазон', () => {
      const result = getTimeNumbers('hours', { step: 1 });
      expect(result.length).toBe(24);
    });

    it('корректно обрабатывает максимальные значения', () => {
      const hoursResult = getTimeNumbers('hours', { start: 22, stop: 23 });
      expect(hoursResult).toEqual([22, 23]);

      const minutesResult = getTimeNumbers('minutes', { start: 58, stop: 59 });
      expect(minutesResult).toEqual([58, 59]);

      const secondsResult = getTimeNumbers('seconds', { start: 58, stop: 59 });
      expect(secondsResult).toEqual([58, 59]);
    });
  });
});

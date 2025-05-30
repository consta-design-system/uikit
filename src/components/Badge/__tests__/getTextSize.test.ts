import { badgePropSize } from '..';
import { getTextSize } from '../maps';

const resultMap: Record<string, string> = {
  l: 'var(--badge-text-size)',
  m: 'var(--size-text-xs)',
  s: 'var(--size-text-2xs)',
  xs: 'calc(var(--size-text-m) / 2)',
};

describe('Компонент Badge проверка getTextSize', () => {
  badgePropSize.forEach((size) => {
    it(`возвращает правильное значение для size=${size}`, () => {
      expect(getTextSize(size)).toBe(resultMap[`${size}`]);
    });
  });
});

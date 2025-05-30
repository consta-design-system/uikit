import { badgePropSize } from '..';
import { getSize } from '../maps';

const resultMap: Record<string, string> = {
  'l-false': 'var(--space-2xl)',
  'l-true': '32px',
  'm-false': 'var(--space-xl)',
  'm-true': '24px',
  's-false': 'var(--space-l)',
  's-true': '16px',
  'xs-false': 'var(--space-m)',
  'xs-true': '10px',
};

describe('Компонент Badge проверка getSize', () => {
  badgePropSize.forEach((size) => {
    [true, false].forEach((minified) => {
      it(`возвращает правильное значение для size=${size}, minified=${minified}`, () => {
        expect(getSize(size, minified)).toBe(resultMap[`${size}-${minified}`]);
      });
    });
  });
});

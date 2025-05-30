import { badgePropSize } from '..';
import { getMinifiedBorderSize } from '../maps';

const resultMap: Record<string, string | undefined> = {
  'l-false': undefined,
  'l-true': '5px',
  'm-false': undefined,
  'm-true': '4px',
  's-false': undefined,
  's-true': '3px',
  'xs-false': undefined,
  'xs-true': '2px',
};

describe('Компонент Badge проверка getMinifiedBorderSize', () => {
  badgePropSize.forEach((size) => {
    [true, false].forEach((minified) => {
      it(`возвращает правильное значение для size=${size}, minified=${minified}`, () => {
        expect(getMinifiedBorderSize(size, minified)).toBe(
          resultMap[`${size}-${minified}`],
        );
      });
    });
  });
});

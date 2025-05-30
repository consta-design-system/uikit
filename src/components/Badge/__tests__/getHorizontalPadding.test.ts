import { badgePropForm, badgePropSize } from '..';
import { getHorizontalPadding } from '../maps';

const resultMap: Record<string, string | undefined> = {
  'l-default-false': 'var(--space-xs)',
  'l-default-true': undefined,
  'l-round-false': 'var(--space-s)',
  'l-round-true': undefined,
  'm-default-false': 'var(--space-xs)',
  'm-default-true': undefined,
  'm-round-false': 'var(--space-s)',
  'm-round-true': undefined,
  's-default-false': 'var(--space-2xs)',
  's-default-true': undefined,
  's-round-false': 'var(--space-xs)',
  's-round-true': undefined,
  'xs-default-false': 'var(--space-2xs)',
  'xs-default-true': undefined,
  'xs-round-false': 'var(--space-xs)',
  'xs-round-true': undefined,
};

describe('Компонент Badge проверка getHorizontalPadding', () => {
  badgePropSize.forEach((size) => {
    badgePropForm.forEach((form) => {
      [true, false].forEach((minified) => {
        it(`возвращает правильное значение для size=${size}, form=${form}, minified=${minified}`, () => {
          expect(getHorizontalPadding(size, form, minified)).toBe(
            resultMap[`${size}-${form}-${minified}`],
          );
        });
      });
    });
  });
});

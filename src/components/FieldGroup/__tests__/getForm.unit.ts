import { describe, expect, test } from 'vitest';

import { getForm } from '../getForm';
import { FieldGroupPropForm } from '../types';

const expectedMap: Record<
  FieldGroupPropForm,
  [Exclude<FieldGroupPropForm, 'clear'>, Exclude<FieldGroupPropForm, 'clear'>]
> = {
  default: ['defaultClear', 'brickDefault'],
  defaultClear: ['defaultClear', 'brickClear'],
  defaultBrick: ['defaultClear', 'brick'],
  brick: ['brickClear', 'brick'],
  brickDefault: ['brickClear', 'brickDefault'],
  brickClear: ['brickClear', 'brickClear'],
  brickRound: ['brickClear', 'brickRound'],
  round: ['roundClear', 'brickRound'],
  roundClear: ['roundClear', 'brickClear'],
  roundBrick: ['roundClear', 'brick'],
  clearRound: ['clearClear', 'brickRound'],
  clearDefault: ['clearClear', 'brickDefault'],
  clearBrick: ['clearClear', 'brick'],
  clearClear: ['clearClear', 'brickClear'],
  clear: ['clearClear', 'brickClear'],
};

describe('Функция getForm', () => {
  test('для единственного элемента возвращает переданную форму без изменений', () => {
    (Object.keys(expectedMap) as FieldGroupPropForm[]).forEach((form) => {
      expect(getForm(form, 0, 1)).toBe(form);
    });
  });

  test('по умолчанию использует form="default"', () => {
    expect(getForm(undefined, 0, 3)).toBe('defaultClear');
    expect(getForm(undefined, 1, 3)).toBe('brickClear');
    expect(getForm(undefined, 2, 3)).toBe('brickDefault');
  });

  (Object.keys(expectedMap) as FieldGroupPropForm[]).forEach((form) => {
    describe(`form="${form}"`, () => {
      const [firstForm, lastForm] = expectedMap[form];

      test('для первого элемента возвращает форму начала группы', () => {
        expect(getForm(form, 0, 3)).toBe(firstForm);
      });

      test('для среднего элемента возвращает "brickClear"', () => {
        expect(getForm(form, 1, 3)).toBe('brickClear');
      });

      test('для последнего элемента возвращает форму конца группы', () => {
        expect(getForm(form, 2, 3)).toBe(lastForm);
      });
    });
  });
});

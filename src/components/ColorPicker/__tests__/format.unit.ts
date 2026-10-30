import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { formatClassName } from '../utils/format';

createRoot();
clearStack();

describe('formatClassName', () => {
  test('объединяет непустые строки через пробел', () => {
    expect(formatClassName(['class1', 'class2', 'class3'])).toBe(
      'class1 class2 class3',
    );
  });

  test('игнорирует пустые значения', () => {
    expect(
      formatClassName(['class1', '', 'class2', null, undefined, 'class3']),
    ).toBe('class1 class2 class3');
  });

  test('возвращает пустую строку, если все значения пустые', () => {
    expect(formatClassName([null, undefined, ''])).toBe('');
  });

  test('обрабатывает массив из одного элемента', () => {
    expect(formatClassName(['single'])).toBe('single');
  });
});

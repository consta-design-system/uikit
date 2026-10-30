import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { badgePropSize } from '..';
import { getTextSize } from '../maps';

createRoot();
clearStack();

const resultMap: Record<string, string> = {
  l: 'var(--badge-text-size)',
  m: 'var(--size-text-xs)',
  s: 'var(--size-text-2xs)',
  xs: 'calc(var(--size-text-m) / 2)',
};

describe('Компонент Badge проверка getTextSize', () => {
  badgePropSize.forEach((size) => {
    test(`возвращает правильное значение для size=${size}`, () => {
      expect(getTextSize(size)).toBe(resultMap[`${size}`]);
    });
  });
});

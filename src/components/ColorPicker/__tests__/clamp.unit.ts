import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { clamp } from '../utils/clamp';

createRoot();
clearStack();

describe.concurrent('clamp', () => {
  test('возвращает число в пределах [min, max]', () => {
    expect(clamp(0.5)).toBe(0.5);
    expect(clamp(1.5)).toBe(1);
    expect(clamp(-0.5)).toBe(0);
    expect(clamp(0, 0, 1)).toBe(0);
    expect(clamp(1, 0, 1)).toBe(1);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(-1, 0, 1)).toBe(0);
  });

  test('работает с пользовательскими min и max', () => {
    expect(clamp(5, 10, 20)).toBe(10);
    expect(clamp(15, 10, 20)).toBe(15);
    expect(clamp(25, 10, 20)).toBe(20);
    expect(clamp(10, 10, 20)).toBe(10);
    expect(clamp(20, 10, 20)).toBe(20);
  });

  test('работает с отрицательными min и max', () => {
    expect(clamp(-5, -10, 0)).toBe(-5);
    expect(clamp(-15, -10, 0)).toBe(-10);
    expect(clamp(5, -10, 0)).toBe(0);
  });
});

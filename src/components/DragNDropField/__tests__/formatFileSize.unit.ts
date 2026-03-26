import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { formatFileSize } from '../formatFileSize';
import { defaultLocale } from '../locale';

createRoot();
clearStack();

describe.concurrent('formatMaxFileSize', () => {
  test('форматирует байты', () => {
    expect(formatFileSize(1, defaultLocale)).toBe('1 байт');
    expect(formatFileSize(1023, defaultLocale)).toBe('1023 байт');
  });

  test('форматирует килобайты', () => {
    expect(formatFileSize(1024, defaultLocale)).toBe('1 Кб');
    expect(formatFileSize(1024 * 1024 - 1, defaultLocale)).toBe('1023.9 Кб');
  });

  test('форматирует мегабайты', () => {
    expect(formatFileSize(1024 * 1024, defaultLocale)).toBe('1 Мб');
    expect(formatFileSize(1024 * 1024 * 1024 - 1, defaultLocale)).toBe(
      '1023.9 Мб',
    );
  });

  test('форматирует гигабайты', () => {
    expect(formatFileSize(1024 * 1024 * 1024, defaultLocale)).toBe('1 Гб');
    expect(formatFileSize(1024 * 1024 * 1024 * 234.56, defaultLocale)).toBe(
      '234.5 Гб',
    );
  });
});

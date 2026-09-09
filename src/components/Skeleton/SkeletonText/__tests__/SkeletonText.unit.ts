import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { getRowWidth } from '../SkeletonText';

createRoot();
clearStack();

describe('getRowWidth', () => {
  test('возвращает 50%, если это единственная строка', () => {
    expect(getRowWidth(0, 1)).toBe('50%');
  });

  test('возвращает 50%, если это последняя строка', () => {
    expect(getRowWidth(1, 2)).toBe('50%');
    expect(getRowWidth(9, 10)).toBe('50%');
  });

  test('возвращает полную ширину, если это первая строка из тройки', () => {
    expect(getRowWidth(0, 10)).toBe('100%');
    expect(getRowWidth(3, 10)).toBe('100%');
    expect(getRowWidth(6, 10)).toBe('100%');
  });

  test('возвращает 85%, если это вторая строка из тройки', () => {
    expect(getRowWidth(1, 10)).toBe('85%');
    expect(getRowWidth(4, 10)).toBe('85%');
    expect(getRowWidth(7, 10)).toBe('85%');
  });

  test('возвращает 93%, если это третья строка из тройки', () => {
    expect(getRowWidth(2, 10)).toBe('93%');
    expect(getRowWidth(5, 10)).toBe('93%');
    expect(getRowWidth(8, 10)).toBe('93%');
  });
});

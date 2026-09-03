import { clearStack } from '@reatom/core';
import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { cn } from '../../../utils/bem';
import { Breakpoints, generateBreakpointsCn } from '../useBreakpoints';

createRoot();
clearStack();

const cnTest = cn('Test');

describe('generateBreakpointsCn', () => {
  test('breakpoints = undefined', () => {
    const result = generateBreakpointsCn(cnTest);
    const expected = '';
    expect(result).toEqual(expected);
  });

  test('breakpoints = empty object', () => {
    const result = generateBreakpointsCn(cnTest, {});
    const expected = '';
    expect(result).toEqual(expected);
  });

  test('breakpoints = Breakpoints', () => {
    const breakpoints: Breakpoints = {
      xs: undefined,
      m: {},
      l: {
        cols: 8,
        align: 'center',
      },
      xl: {
        cols: 10,
        align: 'left',
      },
    };

    const result = generateBreakpointsCn(cnTest, breakpoints);
    const expected =
      'Test Test_l:cols_8 Test_l:align_center Test_xl:cols_10 Test_xl:align_left';
    expect(result).toEqual(expected);
  });
});

import { describe, expect, test } from 'vitest';

import { createRoot } from '##/utils/vitest';

import { getPaginationInfo } from '../helpers';

createRoot();

const DEFAULT_INFO = {
  isEmpty: false,
  prevPage: -1,
  nextPage: 1,
  isStartDots: false,
  isEndDots: false,
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

describe('getPaginationInfo', () => {
  test('возвращает корректные данные в начале', (ctx) =>
    expect(getPaginationInfo(0, 10)).toEqual(DEFAULT_INFO));

  test('возвращает корректные данные если страница поменялась', (ctx) => {
    const { pages } = getPaginationInfo(6, 11);
    const expectedPages = [4, 5, 6, 7, 8, 9, 10, 11];
    expect(pages).toEqual(expectedPages);
  });
});

import { getPaginationInfo } from '../helpers';

const DEFAULT_INFO = {
  isEmpty: false,
  prevPage: -1,
  nextPage: 1,
  isStartDots: false,
  isEndDots: false,
  pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

describe('getPaginationInfo', () => {
  it('возвращает корректные данные в начале', () => {
    expect(getPaginationInfo(0, 10)).toEqual(DEFAULT_INFO);
  });

  it('возвращает корректные данные если страница поменялась', () => {
    const { pages } = getPaginationInfo(6, 11);
    const expectedPages = [4, 5, 6, 7, 8, 9, 10, 11];
    expect(pages).toEqual(expectedPages);
  });
});

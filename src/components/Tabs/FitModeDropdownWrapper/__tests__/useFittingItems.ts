import { getFittingItemsCount } from '../useFittingItems';

describe('getFittingItemsCount', () => {
  it('возвращает 3, если размеры пока неизвестны', () => {
    expect(
      getFittingItemsCount({
        tabsDimensions: [
          {
            size: 0,
            gap: 10,
          },
          {
            size: 0,
            gap: 10,
          },
          {
            size: 0,
            gap: 10,
          },
        ],
        totalWidth: 0,
        moreItemsWidth: 0,
      }),
    ).toBe(3);
  });

  it('возвращает 3, если вмещаются все айтемы', () => {
    expect(
      getFittingItemsCount({
        tabsDimensions: [
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
        ],
        totalWidth: 100 + 10 + 100 + 10 + 100,
        moreItemsWidth: 50,
      }),
    ).toBe(3);
  });

  it('возвращает 2, если вмещаются 2 айтема и разворачивалка', () => {
    expect(
      getFittingItemsCount({
        tabsDimensions: [
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
        ],
        totalWidth: 100 + 10 + 100 + 10 + 50,
        moreItemsWidth: 50,
      }),
    ).toBe(2);
  });

  it('возвращает 1, если вмещаются 1 айтем и разворачивалка', () => {
    expect(
      getFittingItemsCount({
        tabsDimensions: [
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
        ],
        totalWidth: 100 + 10 + 50,
        moreItemsWidth: 50,
      }),
    ).toBe(1);
  });

  it('возвращает 0, если вмещается только разворачивалка', () => {
    expect(
      getFittingItemsCount({
        tabsDimensions: [
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
          {
            size: 100,
            gap: 10,
          },
        ],
        totalWidth: 100 + 10 + 50 - 1,
        moreItemsWidth: 50,
      }),
    ).toBe(0);
  });
});

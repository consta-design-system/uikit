import { getFittingItemsCount } from '../useFittingItems';

describe('getFittingItemsCount', () => {
  it('возвращает 3, если размеры пока неизвестны', () => {
    expect(
      getFittingItemsCount(
        [
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
        0,
        0,
      ),
    ).toBe(3);
  });

  it('возвращает 3, если вмещаются все айтемы', () => {
    expect(
      getFittingItemsCount(
        [
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
        100 + 10 + 100 + 10 + 100,
        50,
      ),
    ).toBe(3);
  });

  it('возвращает 2, если вмещаются 2 айтема и разворачивалка', () => {
    expect(
      getFittingItemsCount(
        [
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
        100 + 10 + 100 + 10 + 50,
        50,
      ),
    ).toBe(2);
  });

  it('возвращает 1, если вмещаются 1 айтем и разворачивалка', () => {
    expect(
      getFittingItemsCount(
        [
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
        100 + 10 + 50,
        50,
      ),
    ).toBe(1);
  });

  it('возвращает 0, если вмещается только разворачивалка', () => {
    expect(
      getFittingItemsCount(
        [
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
        100 + 10 + 50 - 1,
        50,
      ),
    ).toBe(0);
  });
});

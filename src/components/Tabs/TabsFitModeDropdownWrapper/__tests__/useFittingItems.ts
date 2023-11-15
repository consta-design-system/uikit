import { getFittingItems } from '../useFittingItems';

describe('getFittingItems', () => {
  it('возвращает 3 индекса, если размеры пока неизвестны', () => {
    expect(
      getFittingItems(
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
    ).toBe([0, 1, 2]);
  });

  it('возвращает 3 индекса, если вмещаются все айтемы', () => {
    expect(
      getFittingItems(
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
    ).toBe([0, 1, 2]);
  });

  it('возвращает первые два индекса, если вмещаются 2 айтема и разворачивалка', () => {
    expect(
      getFittingItems(
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
    ).toBe([0, 1]);
  });

  it('возвращает первый индекс, если вмещаются 1 айтем и разворачивалка', () => {
    expect(
      getFittingItems(
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
    ).toBe([0]);
  });

  it('возвращает сортированные два индекса, если вмещаются 2 айтема и разворачивалка', () => {
    expect(
      getFittingItems(
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
        2,
      ),
    ).toBe([0, 2]);
  });
});

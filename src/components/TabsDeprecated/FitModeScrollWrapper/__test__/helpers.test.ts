import { TabDimensions } from '../../helpers';
import { getVisibleTabsRange } from '../helpers';

describe('getVisibleTabsRange', () => {
  const tabsDimensions: TabDimensions[] = [
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
      gap: 0,
    },
  ];

  it('возвращает все табы, если все вмещаются', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 330,
        scrollLeft: 0,
        containerPaddingLeft: 10,
      }),
    ).toEqual([0, 2]);
  });

  it('возвращает все табы, если проскроллили только паддинг', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 320,
        scrollLeft: 10,
        containerPaddingLeft: 10,
      }),
    ).toEqual([0, 2]);
  });

  it('возвращает все табы, кроме последнего, если последний не вместился полностью', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 329,
        scrollLeft: 0,
        containerPaddingLeft: 10,
      }),
    ).toEqual([0, 1]);
  });

  it('возвращает все табы, кроме первого, если первый не виден полностью из-за скролла', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 319,
        scrollLeft: 11,
        containerPaddingLeft: 10,
      }),
    ).toEqual([1, 2]);
  });

  it('возвращает только средний таб, если первый и последний не видны полностью', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 318,
        scrollLeft: 11,
        containerPaddingLeft: 10,
      }),
    ).toEqual([1, 1]);
  });

  it('возвращает только средний таб, даже если он не влез полностью, но виден его левый край', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 50,
        scrollLeft: 110,
        containerPaddingLeft: 10,
      }),
    ).toEqual([1, 1]);
  });

  it('возвращает только первый таб, если ничего не влезает', () => {
    expect(
      getVisibleTabsRange({
        tabsDimensions,
        containerWidth: 10,
        scrollLeft: 0,
        containerPaddingLeft: 10,
      }),
    ).toEqual([0, 0]);
  });
});

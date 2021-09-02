import { getTabsWidth, TabDimensions } from '../helpers';

export const getVisibleTabsRange = ({
  tabsDimensions,
  containerWidth,
  containerPaddingLeft,
  scrollLeft,
}: {
  tabsDimensions: TabDimensions[];
  containerWidth: number;
  containerPaddingLeft: number;
  scrollLeft: number;
}): [number, number] => {
  let firstVisibleTabIdx = null;
  let lastVisibleTabIdx = null;

  const containerLeftSide = scrollLeft;
  const containerRightSide = containerLeftSide + containerWidth;

  for (let idx = 0; idx < tabsDimensions.length; idx++) {
    const previousTabsWidth = getTabsWidth(tabsDimensions.slice(0, idx));
    const tabElLeftSide = containerPaddingLeft + previousTabsWidth;
    const isTabLeftSideVisible = tabElLeftSide >= containerLeftSide;
    if (isTabLeftSideVisible && firstVisibleTabIdx === null) {
      firstVisibleTabIdx = idx;
    }

    const tabElRightSide = tabElLeftSide + tabsDimensions[idx].size;
    const isTabRightSideVisible = tabElRightSide <= containerRightSide;
    if (isTabRightSideVisible) {
      lastVisibleTabIdx = idx;
    }
  }

  firstVisibleTabIdx = firstVisibleTabIdx ?? 0;
  lastVisibleTabIdx = Math.max(firstVisibleTabIdx, lastVisibleTabIdx ?? 0);

  return [firstVisibleTabIdx, lastVisibleTabIdx];
};

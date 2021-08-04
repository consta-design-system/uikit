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
    const tabElRightSide = tabElLeftSide + tabsDimensions[idx].size;

    const isTabVisible = tabElLeftSide >= containerLeftSide && tabElRightSide <= containerRightSide;

    if (isTabVisible) {
      firstVisibleTabIdx = firstVisibleTabIdx ?? idx;
      lastVisibleTabIdx = idx;
    }
  }

  return [firstVisibleTabIdx ?? 0, lastVisibleTabIdx ?? 0];
};

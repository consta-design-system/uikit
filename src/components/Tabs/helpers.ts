import { TabDimensions, TabsPropLinePosition } from './Tabs';

export const getTabsDirection = (linePosition: TabsPropLinePosition): 'horizontal' | 'vertical' =>
  linePosition === 'left' || linePosition === 'right' ? 'vertical' : 'horizontal';

export const getTabsWidth = (tabsDimensions: TabDimensions[]): number =>
  tabsDimensions.reduce((acc, td) => acc + td.size + td.gap, 0);

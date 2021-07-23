import { TabsPropLinePosition } from './Tabs';

export const getTabsDirection = (linePosition: TabsPropLinePosition): 'horizontal' | 'vertical' =>
  linePosition === 'left' || linePosition === 'right' ? 'vertical' : 'horizontal';

import './TabsLine.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getTabsWidth, TabDimensions } from '../helpers';
import { TabsPropLinePosition } from '../TabsDeprecated';

const cnTabsLine = cn('TabsLine');

export const TabsBorderLine: React.FC<{
  linePosition: TabsPropLinePosition;
}> = ({ linePosition }) => {
  return <TabsLine type="border" linePosition={linePosition} size="100%" />;
};

export const TabsRunningLine: React.FC<{
  linePosition: TabsPropLinePosition;
  activeTabIdx: number;
  tabsDimensions: TabDimensions[];
}> = ({ linePosition, activeTabIdx, tabsDimensions }) => {
  const previousTabsDimensions = tabsDimensions.slice(0, activeTabIdx);
  const size = tabsDimensions[activeTabIdx]?.size ?? 0;
  const offset = getTabsWidth(previousTabsDimensions);

  return (
    <TabsLine
      type="running"
      linePosition={linePosition}
      size={size}
      offset={offset}
    />
  );
};

const TabsLine: React.FC<{
  type: 'border' | 'running';
  linePosition: TabsPropLinePosition;
  size: number | string;
  offset?: number | string;
}> = ({ type, linePosition, size, offset = '0px' }) => (
  <div
    className={cnTabsLine({ type, position: linePosition })}
    style={{
      ['--line-length' as string]: formatCSSValue(size),
      ['--line-offset' as string]: formatCSSValue(offset),
    }}
  />
);

const formatCSSValue = (n: number | string) =>
  typeof n === 'number' ? `${n}px` : n;

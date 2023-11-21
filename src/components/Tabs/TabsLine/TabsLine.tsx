import './TabsLine.css';

import React, { useMemo } from 'react';

import { cn } from '../../../utils/bem';
import { TabDimensions, TabsPropLinePosition } from '../types';

const cnTabsLine = cn('TabsLine');

export const TabsBorderLine: React.FC<{
  linePosition: TabsPropLinePosition;
}> = ({ linePosition }) => {
  return <TabsLine type="border" linePosition={linePosition} size="100%" />;
};

export const TabsRunningLine: React.FC<{
  linePosition: TabsPropLinePosition;
  activeTabIdx: number;
  visibleIndexes?: number[];
  tabsDimensions: TabDimensions[];
}> = ({ linePosition, activeTabIdx, tabsDimensions, visibleIndexes }) => {
  const size = tabsDimensions[activeTabIdx]?.size ?? 0;

  const offset = useMemo(
    () =>
      tabsDimensions.reduce(
        (a, v, index) =>
          a +
          (visibleIndexes?.includes(index) && index < activeTabIdx
            ? v.size + v.gap
            : 0),
        0,
      ),
    [tabsDimensions, visibleIndexes, activeTabIdx],
  );

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

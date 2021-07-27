import './TabsLine.css';

import React from 'react';

import { cn } from '../../../utils/bem';
import { getTabsWidth } from '../helpers';
import { TabDimensions, TabsPropLinePosition } from '../Tabs';

const cnTabsLine = cn('TabsLine');

type Props =
  | {
      type: 'border';
      linePosition: TabsPropLinePosition;
    }
  | {
      type: 'running';
      linePosition: TabsPropLinePosition;
      tabsDimensions: TabDimensions[];
      activeTabIdx: number;
    };

export const TabsLine: React.FC<Props> = ({ linePosition, ...restProps }) => {
  if (restProps.type === 'border') {
    return <div className={cnTabsLine({ type: 'border', position: linePosition })} />;
  }

  const { tabsDimensions, activeTabIdx } = restProps;
  const size = tabsDimensions[activeTabIdx]?.size ?? 0;
  const previousTabsDimensions = tabsDimensions.slice(0, activeTabIdx);
  const offset = getTabsWidth(previousTabsDimensions);

  return size > 0 ? (
    <div
      className={cnTabsLine({ type: 'running', position: linePosition })}
      style={{
        ['--tabSize' as string]: `${size}px`,
        ['--tabOffset' as string]: `${offset}px`,
      }}
    />
  ) : null;
};

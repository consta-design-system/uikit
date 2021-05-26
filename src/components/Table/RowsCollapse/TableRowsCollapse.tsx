import './TableRowsCollapse.css';

import React from 'react';

import { IconArrowDown } from '../../../icons/IconArrowDown/IconArrowDown';
import { IconArrowUp } from '../../../icons/IconArrowUp/IconArrowUp';
import { cn } from '../../../utils/bem';

export type Props = {
  level: number;
  isExpandedByDefault?: boolean;
  toggleCollapse?: (e: React.SyntheticEvent) => void;
  isExpanded?: boolean;
  withCollapseButton?: boolean;
};

export const cnTableRowsCollapse = cn('TableRowsCollapse');

export const TableRowsCollapse: React.FC<Props> = (props) => {
  const {
    level,
    children,
    isExpanded,
    toggleCollapse,
    withCollapseButton,
    isExpandedByDefault,
  } = props;

  const style: React.CSSProperties & {
    '--nesting-level': number;
  } = { '--nesting-level': level };

  return (
    <div style={style} className={cnTableRowsCollapse()}>
      {!isExpandedByDefault && withCollapseButton && (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <span
          className={cnTableRowsCollapse('button')}
          role="button"
          onClick={toggleCollapse}
          onKeyDown={toggleCollapse}
        >
          {isExpanded ? <IconArrowDown size="s" /> : <IconArrowUp size="s" />}
        </span>
      )}
      <div
        className={cnTableRowsCollapse('cellContainer', {
          withExpanderPadding: !isExpandedByDefault,
        })}
      >
        {children}
      </div>
    </div>
  );
};

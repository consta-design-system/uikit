import './TableRowsCollapse.css';

import React from 'react';

import { IconArrowDown } from '../../../icons/IconArrowDown/IconArrowDown';
import { IconArrowUp } from '../../../icons/IconArrowUp/IconArrowUp';
import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';

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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      style={style}
      className={cnTableRowsCollapse()}
      onClick={toggleCollapse}
      onKeyDown={toggleCollapse}
    >
      {!isExpandedByDefault && withCollapseButton && (
        <div className={cnTableRowsCollapse('buttonContainer')}>
          <Button
            iconLeft={isExpanded ? IconArrowUp : IconArrowDown}
            iconSize="s"
            size="xs"
            onlyIcon
            view="clear"
          />
        </div>
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

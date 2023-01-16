import './ListGroupLabel.css';

import React, { forwardRef } from 'react';

import { cn } from '##/utils/bem';

import { cnListItemGrid, renderSlot } from '../ListItemGrid';
import { defaultListPropSize, ListGroupLabelProps } from '../types';

const cnListGroupLabel = cn('ListGroupLabel');

export const ListGroupLabel = forwardRef<HTMLDivElement, ListGroupLabelProps>(
  (props, ref) => {
    const {
      rightSide,
      size = defaultListPropSize,
      label,
      className,
      ...otherProps
    } = props;

    return (
      <div
        ref={ref}
        className={cnListGroupLabel({ size }, [cnListItemGrid(), className])}
        {...otherProps}
      >
        {!rightSide ? (
          label
        ) : (
          <span className={cnListItemGrid('Slot', { position: 'center' })}>
            {label}
          </span>
        )}
        {renderSlot(rightSide, 'right', size, undefined)}
      </div>
    );
  },
);

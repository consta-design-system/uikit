import './ListDivider.css';

import React, { forwardRef } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  mapDividerVerticalSpace,
  mapHorizontalSpace,
  mapHorizontalSpaceIncreased,
} from '../maps';
import { defaultListPropSize, ListDividerProps } from '../types';

export const cnListDivider = cn('ListDivider');

export const ListDivider = forwardRef<HTMLDivElement, ListDividerProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      innerOffset,
      className,
      space,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnListDivider(null, [
          cnMixSpace(
            space || {
              mH:
                innerOffset === 'increased'
                  ? mapHorizontalSpaceIncreased[size]
                  : mapHorizontalSpace[size],
              mV: mapDividerVerticalSpace[size],
            },
          ),
          className,
        ])}
      />
    );
  },
);

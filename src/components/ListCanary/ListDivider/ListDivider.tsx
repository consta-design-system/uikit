import './ListDivider.css';

import React, { forwardRef } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  mapDividerVerticalSpace,
  mapHorisontalSpase,
  mapHorisontalSpaseIncreased,
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
                  ? mapHorisontalSpaseIncreased[size]
                  : mapHorisontalSpase[size],
              mV: mapDividerVerticalSpace[size],
            },
          ),
          className,
        ])}
      />
    );
  },
);

import './ListDivider.css';

import React, { forwardRef } from 'react';

import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import {
  mapGroupVerticalSpaseBottom,
  mapGroupVerticalSpaseTop,
  mapHorisontalSpase,
  mapHorisontalSpaseIncreased,
} from '../maps';
import { defaultListPropSize, ListDividerProps } from '../types';

const cnListDivider = cn('ListDivider');

export const ListDivider = forwardRef<HTMLDivElement, ListDividerProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      indent,
      className,
      ...otherProps
    } = props;

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnListDivider(null, [
          cnMixSpace({
            mH:
              indent === 'increased'
                ? mapHorisontalSpaseIncreased[size]
                : mapHorisontalSpase[size],
            mT: mapGroupVerticalSpaseTop[size],
            mB: mapGroupVerticalSpaseBottom[size],
          }),
          className,
        ])}
      />
    );
  },
);

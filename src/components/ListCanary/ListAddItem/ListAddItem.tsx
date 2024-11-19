import { IconAdd } from '@consta/icons/IconAdd';
import React, { forwardRef } from 'react';

import { ListDivider, ListItem } from '..';
import {
  mapGroupVerticalSpaceBottom,
  mapHorizontalSpace,
  mapHorizontalSpaceIncreased,
} from '../maps';
import { defaultListPropSize, ListAddItemProps } from '../types';

export const ListAddItem = forwardRef<HTMLDivElement, ListAddItemProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      innerOffset,
      underLine,
      ...otherProps
    } = props;

    const horizontalSpace =
      innerOffset === 'increased'
        ? mapHorizontalSpaceIncreased[size]
        : mapHorizontalSpace[size];

    return (
      <>
        <ListItem
          {...otherProps}
          size={size}
          ref={ref}
          leftIcon={IconAdd}
          space={{
            pH: horizontalSpace,
            pV: mapGroupVerticalSpaceBottom[size],
          }}
        />
        {underLine && (
          <ListDivider size={size} space={{ mH: horizontalSpace }} />
        )}
      </>
    );
  },
);

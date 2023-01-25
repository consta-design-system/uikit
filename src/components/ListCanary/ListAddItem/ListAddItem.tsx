import { IconAdd } from '@consta/icons/IconAdd';
import React, { forwardRef } from 'react';

import { ListDivider, ListItem } from '..';
import {
  mapGroupVerticalSpaseBottom,
  mapHorisontalSpase,
  mapHorisontalSpaseIncreased,
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

    const horisontalSpase =
      innerOffset === 'increased'
        ? mapHorisontalSpaseIncreased[size]
        : mapHorisontalSpase[size];

    return (
      <>
        <ListItem
          {...otherProps}
          size={size}
          ref={ref}
          leftIcon={IconAdd}
          space={{
            pH: horisontalSpase,
            pV: mapGroupVerticalSpaseBottom[size],
          }}
        />
        {underLine && (
          <ListDivider size={size} space={{ mH: horisontalSpase }} />
        )}
      </>
    );
  },
);

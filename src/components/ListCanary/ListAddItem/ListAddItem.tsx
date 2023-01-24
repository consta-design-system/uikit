import './ListAddItem.css';

import { IconPropSize } from '@consta/icons/Icon';
import { IconAdd } from '@consta/icons/IconAdd';
import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { mapHorisontalSpase, mapHorisontalSpaseIncreased } from '../maps';
import { defaultListPropSize, ListAddItemProps, ListPropSize } from '../types';

const cnListAddItem = cn('ListAddItem');

const mapIconSize: Record<ListPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

const mapVerticalPadding: Record<ListPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 's',
};

const mapIconGap: Record<ListPropSize, Space> = {
  xs: '3xs',
  s: '2xs',
  m: 'xs',
  l: 'xs',
};

export const ListAddItem = forwardRef<HTMLDivElement, ListAddItemProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      className,
      disabled,
      label,
      innerOffset,
      ...otherProps
    } = props;
    return (
      <Text
        {...otherProps}
        size={size}
        className={cnListAddItem({ disabled }, [
          cnMixSpace({
            mH:
              innerOffset === 'increased'
                ? mapHorisontalSpaseIncreased[size]
                : mapHorisontalSpase[size],
            pV: mapVerticalPadding[size],
          }),
          className,
        ])}
        ref={ref}
        lineHeight="xs"
      >
        <IconAdd
          className={cnListAddItem('AddIcon', [
            cnMixSpace({
              mR: mapIconGap[size],
            }),
          ])}
          size={mapIconSize[size]}
        />
        {label}
      </Text>
    );
  },
);

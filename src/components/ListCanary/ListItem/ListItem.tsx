import './ListItem.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace, Space } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { cnListItemGrid, renderSlot } from '../ListItemGrid';
import { mapHorisontalSpase, mapHorisontalSpaseIncreased } from '../maps';
import {
  defaultListPropSize,
  ListItemComponent,
  ListItemProps,
  ListPropSize,
} from '../types';

export const cnListItem = cn('ListItem');

const mapVerticalPadding: Record<ListPropSize, Space> = {
  xs: '2xs',
  s: '2xs',
  m: 'xs',
  l: 'xs',
};

const ListItemRender = (
  props: ListItemProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    size = defaultListPropSize,
    active,
    label,
    indent,
    disabled,
    className,
    leftSide,
    rightSide,
    rightIcon,
    leftIcon,
    as = 'div',
    onClick,
    onKeyDown,
    ...otherProps
  } = props;

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined =
    onClick && !disabled ? onClick : undefined;

  return (
    <Text
      {...otherProps}
      className={cnListItem({ active, disabled, interactive: !!handleClick }, [
        cnMixSpace({
          pH:
            indent === 'increased'
              ? mapHorisontalSpaseIncreased[size]
              : mapHorisontalSpase[size],
          pV: mapVerticalPadding[size],
        }),
        cnListItemGrid(),
        className,
      ])}
      as={as}
      onClick={handleClick}
      lineHeight="xs"
      size={size}
      ref={ref}
    >
      {renderSlot(leftSide, 'left', size, leftIcon)}
      {!rightIcon && !rightIcon && !leftSide && !leftIcon ? (
        label
      ) : (
        <span className={cnListItemGrid('Slot', { position: 'center' })}>
          {label}
        </span>
      )}
      {renderSlot(rightSide, 'right', size, rightIcon)}
    </Text>
  );
};

export const ListItem = forwardRef(ListItemRender) as ListItemComponent;

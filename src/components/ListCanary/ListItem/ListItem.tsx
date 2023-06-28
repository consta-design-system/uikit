import './ListItem.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { cnListItemGrid, renderSlot } from '../ListItemGrid';
import {
  mapHorisontalSpase,
  mapHorisontalSpaseIncreased,
  mapItemVerticalPadding,
} from '../maps';
import {
  defaultListPropSize,
  ListItemComponent,
  ListItemProps,
} from '../types';

export const cnListItem = cn('ListItem');

const ListItemRender = (
  props: ListItemProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    size = defaultListPropSize,
    active,
    label,
    innerOffset,
    disabled,
    className,
    leftSide,
    rightSide,
    rightIcon,
    leftIcon,
    as,
    checked,
    onClick,
    status,
    space,
    iconSize,
    ...otherProps
  } = props;

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined =
    onClick && !disabled ? onClick : undefined;

  return (
    <Text
      {...otherProps}
      className={cnListItem(
        { active, disabled, checked, interactive: !!handleClick },
        [
          cnMixSpace(
            space || {
              pH:
                innerOffset === 'increased'
                  ? mapHorisontalSpaseIncreased[size]
                  : mapHorisontalSpase[size],
              pV: mapItemVerticalPadding[size],
            },
          ),
          cnListItemGrid(),
          className,
        ],
      )}
      as={as}
      onClick={handleClick}
      lineHeight="xs"
      size={size}
      ref={ref}
      view={status}
    >
      {renderSlot(leftSide, 'left', size, leftIcon, iconSize)}
      {!rightIcon && !rightSide && !leftSide && !leftIcon
        ? label
        : label && (
            <span className={cnListItemGrid('Slot', { position: 'center' })}>
              {label}
            </span>
          )}
      {renderSlot(rightSide, 'right', size, rightIcon, iconSize)}
    </Text>
  );
};

export const ListItem = forwardRef(ListItemRender) as ListItemComponent;

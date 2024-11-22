import './ListItem.css';

import React, { forwardRef } from 'react';

import { cnText, textPropViewDefault } from '##/components/Text';
import { cnMixSpace } from '##/mixs/MixSpace';
import { cn } from '##/utils/bem';

import { cnListItemGrid, renderSlot } from '../ListItemGrid';
import {
  mapHorizontalSpace,
  mapHorizontalSpaceIncreased,
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
    as: Tag = 'div',
    checked,
    onClick,
    status = textPropViewDefault,
    space,
    iconSize,
    ...otherProps
  } = props;

  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined =
    onClick && !disabled ? onClick : undefined;

  return (
    <Tag
      {...otherProps}
      className={cnListItem(
        { active, disabled, checked, interactive: !!handleClick },
        [
          cnText({
            lineHeight: 'xs',
            size,
            view: status,
          }),
          cnMixSpace(
            space || {
              pH:
                innerOffset === 'increased'
                  ? mapHorizontalSpaceIncreased[size]
                  : mapHorizontalSpace[size],
              pV: mapItemVerticalPadding[size],
            },
          ),
          cnListItemGrid(),
          className,
        ],
      )}
      onClick={handleClick}
      ref={ref}
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
    </Tag>
  );
};

export const ListItem = forwardRef(ListItemRender) as ListItemComponent;

import './ListItem.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { cn } from '##/utils/bem';

import { cnListItemGrid, renderSlot } from '../ListItemGrid';
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
      className={cnListItem(
        { active, size, indent, disabled, interactive: !!handleClick },
        [cnListItemGrid(), className],
      )}
      as={as}
      onClick={handleClick}
      lineHeight="xs"
      size={size}
      ref={ref}
      {...otherProps}
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

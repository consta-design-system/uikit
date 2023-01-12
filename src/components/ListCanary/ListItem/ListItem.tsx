import './ListItem.css';

import React, { forwardRef } from 'react';

import { Text } from '##/components/Text';
import { IconComponent, IconPropSize } from '##/icons/Icon';
import { cn } from '##/utils/bem';
import { getByMap } from '##/utils/getByMap';

import {
  defaultListPropSize,
  ListItemComponent,
  ListItemProps,
  ListPropSize,
} from '../types';

export const cnListItem = cn('ListItem');

const iconSizeMap: Record<ListPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

const renderSide = (
  side: React.ReactNode,
  position: 'left' | 'right',
  size: ListPropSize,
  icon: IconComponent | undefined,
) => {
  const sides = side ? [...(Array.isArray(side) ? side : [side])] : [];
  if (icon) {
    const Icon = icon;
    const render = <Icon size={getByMap(iconSizeMap, size)} />;
    if (position === 'left') {
      sides.push(render);
    }
    if (position === 'right') {
      sides.unshift(render);
    }
  }
  return sides.map((item, index) => (
    <div
      className={cnListItem('Slot', {
        position,
      })}
      key={cnListItem('Slot', {
        position,
        index,
      })}
    >
      {item}
    </div>
  ));
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
      className={cnListItem(
        { active, size, indent, disabled, interactive: !!handleClick },
        [className],
      )}
      as={as}
      onClick={handleClick}
      lineHeight="xs"
      size={size}
      ref={ref}
      {...otherProps}
    >
      {renderSide(leftSide, 'left', size, leftIcon)}
      {!rightIcon && !rightIcon && !leftSide && !leftIcon ? (
        label
      ) : (
        <span className={cnListItem('Slot', { position: 'center' })}>
          {label}
        </span>
      )}
      {renderSide(rightSide, 'right', size, rightIcon)}
    </Text>
  );
};

export const ListItem = forwardRef(ListItemRender) as ListItemComponent;

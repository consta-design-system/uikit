import './ContextMenuItem.css';

import React from 'react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Text } from '../../Text/Text';
import { sizeMapIcon } from '../helpers';
import {
  contextMenuDefaultSize,
  ContextMenuItemComponent,
  ContextMenuItemProps,
  ContextMenuPropSize,
} from '../types';

export const cnContextMenuItem = cn('ContextMenuItem');

function renderSide(
  side: React.ReactNode,
  position: 'left' | 'right',
  withArrow: boolean,
  size: ContextMenuPropSize,
  icon: IconComponent | undefined,
): React.ReactNode {
  const sides = side ? [...(Array.isArray(side) ? side : [side])] : [];

  if (icon) {
    const Icon = icon;
    const render = <Icon size={getByMap(sizeMapIcon, size)} />;
    if (position === 'left') {
      sides.unshift(render);
    }
    if (position === 'right') {
      sides.push(render);
    }
  }

  if (withArrow) {
    sides.push(<IconArrowRight size="xs" view="secondary" />);
  }

  const sidesRender: React.ReactNode[] = sides.map((item, index) => (
    <div
      className={cnContextMenuItem('Slot', {
        position,
      })}
      key={cnContextMenuItem('Slot', {
        position,
        index,
      })}
    >
      {item}
    </div>
  ));

  return sidesRender;
}

const ContextMenuItemRender = (
  props: ContextMenuItemProps,
  ref: React.Ref<HTMLDivElement>,
) => {
  const {
    label,
    rightSide,
    leftSide,
    size = contextMenuDefaultSize,
    as = 'div',
    disabled,
    status,
    withSubMenu,
    className,
    active,
    leftIcon,
    rightIcon,
    ...otherProps
  } = props;
  const view = (disabled ? undefined : status) || 'primary';

  return (
    <Text
      className={cnContextMenuItem({ size, active, disabled }, [className])}
      as={as}
      size={size}
      view={view}
      lineHeight="xs"
      ref={ref}
      {...otherProps}
    >
      {renderSide(leftSide, 'left', false, size, leftIcon)}
      {!rightSide && !leftSide && !withSubMenu && !leftIcon && !rightIcon ? (
        label
      ) : (
        <div
          className={cnContextMenuItem('Slot', { position: 'center' })}
          key="center"
        >
          {label}
        </div>
      )}
      {renderSide(rightSide, 'right', withSubMenu, size, rightIcon)}
    </Text>
  );
};

export const ContextMenuItem = React.forwardRef(
  ContextMenuItemRender,
) as ContextMenuItemComponent;

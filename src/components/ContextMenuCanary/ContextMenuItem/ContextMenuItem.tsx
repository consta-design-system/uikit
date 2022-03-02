import './ContextMenuItem.css';

import React from 'react';

import { IconComponent } from '../../../icons/Icon/Icon';
import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../../utils/bem';
import { getByMap } from '../../../utils/getByMap';
import { Text } from '../../Text/Text';
import { sizeMapIcon } from '../helper';
import {
  contextMenuDefaultSize,
  ContextMenuItemComponent,
  ContextMenuItemProps,
  ContextMenuPropSize,
} from '../types';

const cnContextMenuItem = cn('ContextMenuItem');

const renderSide = (props: {
  icon?: IconComponent;
  side?: React.ReactNode;
  position: 'left' | 'right';
  size: ContextMenuPropSize;
}) => {
  const { icon, side, position, size } = props;
  const Icon = icon;
  return (
    (Icon || side) && (
      <div className={cnContextMenuItem('Side', { position })}>
        {Icon ? <Icon size={getByMap(sizeMapIcon, size)} /> : side}
      </div>
    )
  );
};

function ContextMenuItemRender(props: ContextMenuItemProps, ref: React.Ref<HTMLDivElement>) {
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
      {renderSide({
        icon: leftIcon,
        side: leftSide,
        position: 'left',
        size,
      })}
      <div className={cnContextMenuItem('Label')}>{label}</div>
      {renderSide({
        icon: rightIcon,
        side: rightSide,
        position: 'right',
        size,
      })}
      {withSubMenu && (
        <div className={cnContextMenuItem('Side', { position: 'right' })}>
          <IconArrowRight
            size={getByMap(sizeMapIcon, size)}
            view={disabled ? 'disabled' : 'secondary'}
          />
        </div>
      )}
    </Text>
  );
}

export const ContextMenuItem = React.forwardRef(ContextMenuItemRender) as ContextMenuItemComponent;

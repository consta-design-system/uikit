import './ContextMenuItem.css';

import React from 'react';

import { IconArrowRight } from '../../../icons/IconArrowRight/IconArrowRight';
import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import { contextMenuDefaultSize, ContextMenuItem as ContextMenuItemType } from '../helpers';

export const cnContextMenuItem = cn('ContextMenuItem');

function renderSide(
  side: React.ReactNode,
  position: 'left' | 'right',
  withArrow: boolean,
): React.ReactNode {
  const sides = side ? [...(Array.isArray(side) ? side : [side])] : [];
  if (withArrow) {
    sides.push(<IconArrowRight size="xs" view="secondary" />);
  }
  const sidesRender: React.ReactNode[] = sides.map((item, index) => (
    <div
      className={cnContextMenuItem('Side', {
        position,
      })}
      key={index}
    >
      {item}
    </div>
  ));

  return sidesRender;
}

export const ContextMenuItem: ContextMenuItemType = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const {
      label,
      rightSide,
      leftSide,
      size = contextMenuDefaultSize,
      active,
      withSubMenu,
      accent,
      disabled,
      ...otherProps
    } = props;
    const view = disabled ? undefined : accent;

    return (
      <Text
        {...otherProps}
        className={cnContextMenuItem({ size, active, disabled })}
        ref={ref}
        size={size}
        view={view}
        lineHeight="xs"
      >
        {renderSide(leftSide, 'left', false)}
        {!rightSide && !leftSide && !withSubMenu ? (
          label
        ) : (
          <div className={cnContextMenuItem('Side', { position: 'center' })}>{label}</div>
        )}
        {renderSide(rightSide, 'right', withSubMenu)}
      </Text>
    );
  },
);

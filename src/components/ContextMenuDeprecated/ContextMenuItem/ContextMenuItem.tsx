import './ContextMenuItem.css';

import { IconArrowRight } from '@consta/icons/IconArrowRight';
import React, { forwardRef } from 'react';

import { cn } from '../../../utils/bem';
import { Text } from '../../Text/Text';
import {
  contextMenuDefaultSize,
  ContextMenuItemComponent,
  ContextMenuItemProps,
} from '../helpers';

export const cnContextMenuItem = cn('ContextMenuItemDeprecated');

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

export const ContextMenuItem: ContextMenuItemComponent = forwardRef(
  (props: ContextMenuItemProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      label,
      rightSide,
      leftSide,
      size = contextMenuDefaultSize,
      active,
      withSubMenu,
      accent,
      disabled,
      as = 'div',
      className,
      ...otherProps
    } = props;
    const view = (disabled ? undefined : accent) || 'primary';

    return (
      <Text
        {...otherProps}
        className={cnContextMenuItem({ size, active, disabled }, [className])}
        ref={ref}
        size={size}
        view={view}
        lineHeight="xs"
        as={as}
      >
        {renderSide(leftSide, 'left', false)}
        {!rightSide && !leftSide && !withSubMenu ? (
          label
        ) : (
          <div className={cnContextMenuItem('Side', { position: 'center' })}>
            {label}
          </div>
        )}
        {renderSide(rightSide, 'right', withSubMenu)}
      </Text>
    );
  },
) as ContextMenuItemComponent;

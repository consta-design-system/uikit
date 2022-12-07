import './ListItem.css';

import React, { forwardRef } from 'react';

import { Checkbox } from '##/components/Checkbox';
import { IconPropSize } from '##/icons/Icon';
import { cn } from '##/utils/bem';

import { defaultListPropSize, ListItemProps, ListPropSize } from '../types';

export const cnListItem = cn('ListItem');

const iconSizeMap: Record<ListPropSize, IconPropSize> = {
  xs: 'xs',
  s: 'xs',
  m: 's',
  l: 's',
};

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (props, ref) => {
    const {
      size = defaultListPropSize,
      multiple,
      active,
      label,
      indent,
      hovered,
      disabled,
      className,
      leftSide,
      rightSide,
      rightIcon: RightIcon,
      leftIcon: LeftIcon,
      onClick,
      onKeyDown,
      ...otherProps
    } = props;

    const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (!disabled) {
        onClick?.(e);
      }
    };

    return (
      <div
        {...otherProps}
        ref={ref}
        className={cnListItem(
          { active, hovered, multiple, size, indent, disabled },
          [className],
        )}
        onClick={handleClick}
        aria-selected={active}
        onKeyDown={onKeyDown}
        tabIndex={0}
        aria-disabled={disabled}
        role="option"
      >
        <div className={cnListItem('Block', { position: 'left' })}>
          {leftSide}
          {LeftIcon && (
            <LeftIcon size={iconSizeMap[size]} className={cnListItem('Icon')} />
          )}
          {multiple && (
            <Checkbox
              size={size}
              disabled={disabled}
              checked={active}
              className={cnListItem('Checkbox')}
            />
          )}
          <span className={cnListItem('Label')}>{label}</span>
        </div>
        {(rightSide || RightIcon) && (
          <div className={cnListItem('Block', { position: 'right' })}>
            {RightIcon && (
              <RightIcon
                className={cnListItem('Icon')}
                size={iconSizeMap[size]}
              />
            )}
            {rightSide}
          </div>
        )}
      </div>
    );
  },
);

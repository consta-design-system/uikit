import './ChipsItem.css';

import { IconPropSize } from '@consta/icons/Icon';
import React, { useRef } from 'react';

import { Badge } from '##/components/Badge';
import { useForkRef } from '##/hooks/useForkRef';
import { useKeys } from '##/hooks/useKeys';
import { cnMixFocus } from '##/mixs/MixFocus';
import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import {
  ChipsItemProps,
  chipsPropActiveViewDefault,
  ChipsPropSize,
  chipsPropSizeDefault,
} from '../types';

const cnChip = cn('ChipsItem');

const iconSizeMap: Record<ChipsPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

export const ChipsItem = forwardRefWithAs<ChipsItemProps, 'span'>(
  (props, ref) => {
    const {
      as = 'span',
      label,
      size = chipsPropSizeDefault,
      status,
      activeView = chipsPropActiveViewDefault,
      className,
      interactive: interactiveProp,
      style,
      active,
      iconLeft: IconLeft,
      iconRight: IconRight,
      onRightIconClick,
      onKeyUp: onKeyUpProp,
      tabIndex,
      disabled = false,
      ...otherProps
    } = props;

    const componentRef = useRef<HTMLElement>(null);
    const iconButtonRef = useRef<HTMLButtonElement>(null);
    const interactive = disabled ? false : interactiveProp;

    const onKeyUp = useKeys({
      keys: {
        Enter: () => {
          if (iconButtonRef && onRightIconClick) {
            iconButtonRef.current?.focus();
          } else {
            componentRef.current?.click();
          }
        },
        Escape: () => {
          if (iconButtonRef && onRightIconClick) {
            componentRef.current?.focus();
          }
        },
        Space: () => {
          componentRef.current?.click();
        },
      },
      onEvent: onKeyUpProp,
      isActive: !!interactive,
    });

    const Tag = as as string;

    return (
      <Tag
        {...otherProps}
        disabled={disabled}
        className={cnChip(
          {
            size,
            interactive,
            activeView,
            active,
            disabled,
            status: Boolean(status),
          },
          [interactive ? cnMixFocus() : undefined, className],
        )}
        ref={useForkRef([componentRef, ref])}
        onKeyUp={onKeyUp}
        tabIndex={interactive ? tabIndex || 0 : undefined}
        role={interactive ? 'button' : undefined}
      >
        {status && <Badge status={status} size={iconSizeMap[size]} minified />}
        {!status && IconLeft && <IconLeft size={iconSizeMap[size]} />}
        {label}
        {IconRight && (
          <IconRight
            size={iconSizeMap[size]}
            {...(onRightIconClick && !disabled
              ? {
                  as: 'button',
                  role: 'button',
                  type: 'button',
                  onClick: onRightIconClick,
                  className: cnChip('IconButton', [cnMixFocus()]),
                  ref: iconButtonRef,
                  tabIndex: -1,
                }
              : {})}
          />
        )}
      </Tag>
    );
  },
);

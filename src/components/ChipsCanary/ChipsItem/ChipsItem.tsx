import './ChipsItem.css';

import { IconComponent, IconPropSize } from '@consta/icons/Icon';
import React, { ComponentProps, useRef } from 'react';

import { Badge } from '##/components/Badge';
import { useForkRef } from '##/hooks/useForkRef';
import { useKeys } from '##/hooks/useKeysCanary';
import { cnMixFocus } from '##/mixs/MixFocus';
import { cnCanary as cn } from '##/utils/bem';
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

export const ChipsItem = forwardRefWithAs<ChipsItemProps>((props, ref) => {
  const {
    as,
    label,
    size = chipsPropSizeDefault,
    status,
    activeView = chipsPropActiveViewDefault,
    className,
    interactive,
    style,
    active,
    iconLeft: IconLeft,
    iconRight: IconRight,
    onRightIconClick,
    onKeyUp: onKeyUpProp,
    ...otherProps
  } = props;

  const componentRef = useRef<HTMLElement>(null);
  const iconButtonRef = useRef<HTMLButtonElement>(null);

  const onKeyUp = useKeys({
    keys: {
      Enter: () => {
        iconButtonRef.current?.focus();
      },
      Escape: () => {
        componentRef.current?.focus();
      },
    },
    onEvent: onKeyUpProp,
    isActive: Boolean(interactive && iconButtonRef && onRightIconClick),
  });

  const iconProps: ComponentProps<IconComponent> = {
    size: iconSizeMap[size],
  };

  const iconButtonProps: ComponentProps<IconComponent<'button'>> =
    IconRight && onRightIconClick
      ? {
          as: 'button',
          onClick: onRightIconClick,
          className: cnChip('IconButton', [cnMixFocus()]),
          ref: iconButtonRef,
          tabIndex: -1,
        }
      : {};

  const Tag = (as || (interactive ? 'button' : 'span')) as string;

  return (
    <Tag
      {...otherProps}
      className={cnChip(
        { size, interactive, activeView, active, status: Boolean(status) },
        [interactive ? cnMixFocus() : undefined, className],
      )}
      ref={useForkRef([componentRef, ref])}
      onKeyUp={onKeyUp}
    >
      {status && <Badge status={status} size={iconSizeMap[size]} minified />}
      {!status && IconLeft && <IconLeft {...iconProps} />}
      {label}
      {IconRight && <IconRight {...iconProps} {...iconButtonProps} />}
    </Tag>
  );
});

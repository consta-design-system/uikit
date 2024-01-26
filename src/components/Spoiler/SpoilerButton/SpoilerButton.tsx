import './SpoilerButton.css';

import { AnimateIconSwitcher } from '@consta/icons/AnimateIconSwitcher';
import { IconPropSize } from '@consta/icons/Icon';
import { IconArrowDown } from '@consta/icons/IconArrowDown';
import React from 'react';

import { cn } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { Text } from '../../Text';
import {
  defaultSpoilerPropSize,
  SpoilerButtonProps,
  SpoilerPropSize,
} from '../types';

export const cnSpoilerButton = cn('SpoilerButton');

const spoilerIconSizeMap: Record<SpoilerPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

export const SpoilerButton = forwardRefWithAs<SpoilerButtonProps>(
  (props, ref) => {
    const {
      size = defaultSpoilerPropSize,
      lessIcon,
      lessLabel = 'Показать меньше',
      moreIcon = IconArrowDown,
      moreLabel = 'Показать больше',
      className,
      open,
      as = 'div',
      ...otherProps
    } = props;

    const Tag = as as string;

    return (
      <Tag
        {...otherProps}
        className={cnSpoilerButton({ size }, [className])}
        ref={ref}
      >
        <Text
          className={cnSpoilerButton('Label')}
          size={size}
          as="span"
          lineHeight="m"
          view="primary"
        >
          {open ? lessLabel : moreLabel}
        </Text>
        <AnimateIconSwitcher
          className={cnSpoilerButton('Icon')}
          startIcon={moreIcon}
          endIcon={lessIcon}
          active={open}
          endDirection={lessIcon ? undefined : 180}
          size={spoilerIconSizeMap[size]}
        />
      </Tag>
    );
  },
);

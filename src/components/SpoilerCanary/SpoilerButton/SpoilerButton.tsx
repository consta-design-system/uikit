import './SpoilerButton.css';

import { AnimateIconSwitcher } from '@consta/icons/AnimateIconSwitcher';
import React from 'react';

import { IconPropSize } from '##/icons/Icon';
import { IconArrowDown } from '##/icons/IconArrowDown';
import { cnCanary } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { Text } from '../../Text';
import {
  defaultSpoilerPropSize,
  SpoilerButtonProps,
  SpoilerPropSize,
} from '../types';

export const cnSpoilerButton = cnCanary('SpoilerButton');

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
        ref={ref}
        className={cnSpoilerButton({ size }, [className])}
        {...otherProps}
      >
        <Text className={cnSpoilerButton('Label')} size={size} as="span">
          {open ? lessLabel : moreLabel}
        </Text>
        <AnimateIconSwitcher
          startIcon={moreIcon}
          endIcon={lessIcon}
          active={open}
          endDirection={lessIcon ? undefined : 180}
          size={spoilerIconSizeMap[size]}
          className={cnSpoilerButton('Icon')}
        />
      </Tag>
    );
  },
);

import './Spoiler.css';

import { AnimateIconSwitcher } from '@consta/icons/AnimateIconSwitcher';
import React from 'react';

import { IconPropSize } from '##/icons/Icon';
import { cnCanary } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { Text } from '../Text';
import { defaultSpoilerPropSize, SpoilerProps, SpoilerPropSize } from './types';

export const cnSpoiler = cnCanary('Spoiler');

const spoilerIconSizeMap: Record<SpoilerPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

export const Spoiler = forwardRefWithAs<SpoilerProps>((props, ref) => {
  const {
    size = defaultSpoilerPropSize,
    lessIcon,
    lessLabel = 'Показать меньше',
    moreIcon,
    moreLabel = 'Показать больше',
    className,
    open,
    as = 'div',
    ...otherProps
  } = props;

  const underline = !(lessIcon || moreIcon);

  const Tag = as as string;

  return (
    <Tag
      ref={ref}
      className={cnSpoiler({ underline, size }, [className])}
      {...otherProps}
    >
      <Text className={cnSpoiler('Label')} size={size} as="span">
        {open ? lessLabel : moreLabel}
      </Text>
      {!underline && (
        <AnimateIconSwitcher
          startIcon={moreIcon}
          endIcon={lessIcon}
          active={open}
          endDirection={lessIcon ? undefined : 180}
          size={spoilerIconSizeMap[size]}
          className={cnSpoiler('Icon')}
        />
      )}
    </Tag>
  );
});

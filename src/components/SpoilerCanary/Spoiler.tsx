import './Spoiler.css';

import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowUp } from '@consta/icons/IconArrowUp';
import React from 'react';

import { IconPropSize } from '##/icons/Icon';
import { cnCanary } from '##/utils/bem';
import { forwardRefWithAs } from '##/utils/types/PropsWithAsAttributes';

import { Text } from '../Text';
import { defaultSpoilerPropSize, SpoilerProps, SpoilerPropSize } from './types';

const cnSpoiler = cnCanary('Spoiler');

const spoilerIconSizeMap: Record<SpoilerPropSize, IconPropSize> = {
  l: 'm',
  m: 's',
  s: 's',
  xs: 'xs',
};

export const Spoiler = forwardRefWithAs<SpoilerProps>((props, ref) => {
  const {
    size = defaultSpoilerPropSize,
    lessIcon = IconArrowUp,
    lessLabel = 'Показать меньше',
    moreIcon = IconArrowDown,
    moreLabel = 'Показать больше',
    mode = 'external',
    className,
    type = 'more',
    as = 'div',
    ...otherProps
  } = props;

  const Tag = as as string;

  const Icon = type === 'more' ? moreIcon : lessIcon;

  return (
    <Tag
      ref={ref}
      className={cnSpoiler({ underline: mode === 'inner', size }, [className])}
      {...otherProps}
    >
      <Text className={cnSpoiler('Label')} size={size} as="span">
        {type === 'more' ? moreLabel : lessLabel}
      </Text>
      {mode === 'external' && (
        <Icon size={spoilerIconSizeMap[size]} className={cnSpoiler('Icon')} />
      )}
    </Tag>
  );
});

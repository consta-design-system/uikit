import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowUp } from '@consta/icons/IconArrowUp';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Spoiler } from '../Spoiler';
import { defaultSpoilerPropSize, spolierPropSize } from '../types';

const Variants = () => {
  const size = useSelect('size', spolierPropSize, defaultSpoilerPropSize);
  const lessLabel = useText('lessLabel', 'Показать меньше');
  const moreLabel = useText('moreLabel', 'Показать больше');
  const withIcons = useBoolean('withIcons');

  const [isOpen, setIsOpen] = useFlag();

  return (
    <Spoiler
      size={size}
      open={isOpen}
      onClick={setIsOpen.toggle}
      lessLabel={lessLabel}
      moreLabel={moreLabel}
      moreIcon={withIcons ? IconArrowDown : undefined}
      lessIcon={withIcons ? IconArrowUp : undefined}
    />
  );
};

export default Variants;

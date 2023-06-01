import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowUp } from '@consta/icons/IconArrowUp';
import { IconQuestion } from '@consta/icons/IconQuestion';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Spoiler } from '../Spoiler';
import { defaultSpoilerPropSize, spolierPropSize } from '../types';

const Variants = () => {
  const size = useSelect('size', spolierPropSize, defaultSpoilerPropSize);
  const lessLabel = useText('lessLabel', 'Показать меньше');
  const moreLabel = useText('moreLabel', 'Показать больше');
  const mode = useSelect('mode', ['inner', 'external'], 'external');
  const withCustomIcons = useBoolean('withCustomIcons');

  const [isOpen, setIsOpen] = useFlag();

  return (
    <Spoiler
      size={size}
      type={isOpen ? 'less' : 'more'}
      onClick={setIsOpen.toggle}
      mode={mode}
      lessLabel={lessLabel}
      moreLabel={moreLabel}
      moreIcon={withCustomIcons ? IconQuestion : IconArrowDown}
      lessIcon={withCustomIcons ? IconQuestion : IconArrowUp}
    />
  );
};

export default Variants;

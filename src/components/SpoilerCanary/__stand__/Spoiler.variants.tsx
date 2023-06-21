import './SpoilerVariants.css';

import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowUp } from '@consta/icons/IconArrowUp';
import { useBoolean, useSelect, useText } from '@consta/stand';
import React from 'react';

import { Text } from '##/components/Text';
import { useFlag } from '##/hooks/useFlag';
import { cn } from '##/utils/bem';

import { Spoiler } from '../Spoiler';
import { defaultSpoilerPropSize, spolierPropSize } from '../types';

const cnSpoilerVariants = cn('SpoilerVariants');

const Variants = () => {
  const size = useSelect('size', spolierPropSize, defaultSpoilerPropSize);
  const lessLabel = useText('lessLabel', 'Показать меньше');
  const moreLabel = useText('moreLabel', 'Показать больше');
  const withIcons = useBoolean('withIcons');

  const [isOpen, setIsOpen] = useFlag();

  return (
    <div className={cnSpoilerVariants()}>
      <Text weight="semibold">Какой-то текст</Text>
      <Text className={cnSpoilerVariants('Text', { open: isOpen })}>
        Здесь может быть что угодно. Например, этот текст. Но не обязательно: вы
        можете добавить иконки, кнопки, картинки или даже мини-игру (ну вдруг).
      </Text>
      <Spoiler
        size={size}
        open={isOpen}
        onClick={setIsOpen.toggle}
        lessLabel={lessLabel}
        moreLabel={moreLabel}
        moreIcon={withIcons ? IconArrowDown : undefined}
        lessIcon={withIcons ? IconArrowUp : undefined}
      />
    </div>
  );
};

export default Variants;

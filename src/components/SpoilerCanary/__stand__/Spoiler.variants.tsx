import { IconAdd } from '@consta/icons/IconAdd';
import { IconRemove } from '@consta/icons/IconRemove';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React from 'react';

import { Spoiler } from '..';
import { defaultSpoilerPropSize, spolierPropSize } from '../types';

const Variants = () => {
  const size = useSelect('size', spolierPropSize, defaultSpoilerPropSize);
  const mode = useSelect('mode', ['preview', 'blur'], 'blur');
  const maxHeight = useNumber('maxHeight', 96, mode === 'blur');
  const preview = useText(
    'preview',
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять...',
    mode === 'preview',
  );
  const fullText = useText(
    'fullText',
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый, разделенный дугообразными чешуйками живот, на верхушке которого еле держалось готовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами. «Что со мной случилось?» – подумал он.',
  );

  const lessLabel = useText('lessLabel', 'Показать меньше');
  const moreLabel = useText('moreLabel', 'Показать больше');
  const withIcons = useBoolean('withIcons');

  if (mode === 'blur') {
    return (
      <Spoiler
        maxHeight={maxHeight}
        lessLabel={lessLabel}
        moreLabel={moreLabel}
        moreIcon={withIcons ? IconAdd : undefined}
        size={size}
        lessIcon={withIcons ? IconRemove : undefined}
      >
        {fullText}
      </Spoiler>
    );
  }

  return (
    <Spoiler
      size={size}
      preview={preview}
      fullText={fullText}
      lessLabel={lessLabel}
      moreLabel={moreLabel}
      moreIcon={withIcons ? IconAdd : undefined}
      lessIcon={withIcons ? IconRemove : undefined}
    />
  );
};

export default Variants;

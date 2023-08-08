import { IconAdd } from '@consta/icons/IconAdd';
import { IconRemove } from '@consta/icons/IconRemove';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React from 'react';

import { Spoiler } from '..';
import {
  defaultSpoilerPropButtonAlign,
  defaultSpoilerPropSize,
  spolierPropButtonAlign,
  spolierPropSize,
} from '../types';

const Variants = () => {
  const size = useSelect('size', spolierPropSize, defaultSpoilerPropSize);
  const mode = useSelect('mode', ['toggle', 'blur', 'lineClamp'], 'lineClamp');
  const maxHeight = useNumber('maxHeight', 96, mode === 'blur') || 0;
  const lineClamp = useNumber('lineClamp', 4, mode === 'lineClamp') || 0;
  const preview = useText(
    'preview',
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое...',
    mode === 'toggle',
  );
  const content = useText(
    'content',
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый, разделенный дугообразными чешуйками живот, на верхушке которого еле держалось готовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами. «Что со мной случилось?» – подумал он.',
  );

  const lessLabel = useText('lessLabel', 'Показать меньше');
  const moreLabel = useText('moreLabel', 'Показать больше');
  const withIcons = useBoolean('withIcons');
  const buttonIndent = useSelect('buttonIndent', [
    0,
    'auto',
    'm',
    '3xs',
    '2xs',
    'xs',
    's',
    'l',
    'xl',
    '2xl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
  ]);
  const buttonAlign = useSelect(
    'buttonAlign',
    spolierPropButtonAlign,
    defaultSpoilerPropButtonAlign,
  );

  if (mode === 'lineClamp') {
    return (
      <Spoiler
        lineClamp={lineClamp}
        lessLabel={lessLabel}
        moreLabel={moreLabel}
        moreIcon={withIcons ? IconAdd : undefined}
        size={size}
        lessIcon={withIcons ? IconRemove : undefined}
        buttonIndent={buttonIndent}
        buttonAlign={buttonAlign}
      >
        {content}
      </Spoiler>
    );
  }

  if (mode === 'blur') {
    return (
      <Spoiler
        maxHeight={maxHeight}
        lessLabel={lessLabel}
        moreLabel={moreLabel}
        moreIcon={withIcons ? IconAdd : undefined}
        size={size}
        lessIcon={withIcons ? IconRemove : undefined}
        buttonIndent={buttonIndent}
        buttonAlign={buttonAlign}
      >
        {content}
      </Spoiler>
    );
  }

  return (
    <Spoiler
      size={size}
      preview={preview}
      content={content}
      lessLabel={lessLabel}
      moreLabel={moreLabel}
      moreIcon={withIcons ? IconAdd : undefined}
      lessIcon={withIcons ? IconRemove : undefined}
      buttonIndent={buttonIndent}
      buttonAlign={buttonAlign}
    />
  );
};

export default Variants;

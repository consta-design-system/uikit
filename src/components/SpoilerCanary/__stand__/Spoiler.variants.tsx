import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { IconArrowUp } from '@consta/icons/IconArrowUp';
import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useMemo } from 'react';

import { Spoiler } from '../Spoiler';
import { defaultSpoilerPropSize, spolierPropSize } from '../types';

const Variants = () => {
  const size = useSelect('size', spolierPropSize, defaultSpoilerPropSize);
  const mode = useSelect('mode', ['dots', 'blur'], 'blur');
  const maxHeight = useNumber('maxHeight', 96, mode === 'blur');
  const preview = useText(
    'preview',
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять',
    mode === 'dots',
  );
  const fullText = useText(
    'fullText',
    'Проснувшись однажды утром после беспокойного сна, Грегор Замза обнаружил, что он у себя в постели превратился в страшное насекомое. Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову, свой коричневый, выпуклый, разделенный дугообразными чешуйками живот, на верхушке которого еле держалось готовое вот-вот окончательно сползти одеяло. Его многочисленные, убого тонкие по сравнению с остальным телом ножки беспомощно копошились у него перед глазами. «Что со мной случилось?» – подумал он.',
  );

  const lessLabel = useText('lessLabel', 'Показать меньше');
  const moreLabel = useText('moreLabel', 'Показать больше');
  const withIcons = useBoolean('withIcons');

  const params = useMemo(() => {
    if (mode === 'blur') {
      return {
        mode,
        maxHeight,
      };
    }
    return {
      mode,
      preview,
    };
  }, [mode, preview, maxHeight]);

  return (
    <Spoiler
      size={size}
      {...params}
      fullText={fullText}
      lessLabel={lessLabel}
      moreLabel={moreLabel}
      moreIcon={withIcons ? IconArrowDown : undefined}
      lessIcon={withIcons ? IconArrowUp : undefined}
    />
  );
};

export default Variants;

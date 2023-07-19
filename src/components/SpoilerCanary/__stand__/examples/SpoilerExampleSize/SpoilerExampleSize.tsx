import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary';
import { SpoilerPropSize } from '##/components/SpoilerCanary/types';

const items: SpoilerPropSize[] = ['l', 'm', 's', 'xs'];

export const SpoilerExampleSize = () => {
  return (
    <Example
      col={{ 1: 0, 2: 400 }}
      items={items}
      getItemNode={(size) => (
        <Spoiler size={size}>
          Проснувшись однажды утром после беспокойного сна, Грегор Замза
          обнаружил, что он у себя в постели превратился в страшное насекомое.
          Лежа на панцирнотвердой спине, он видел, стоило ему приподнять голову,
          свой коричневый, выпуклый, разделенный дугообразными чешуйками живот,
          на верхушке которого еле держалось готовое вот-вот окончательно
          сползти одеяло. Его многочисленные, убого тонкие по сравнению с
          остальным телом ножки беспомощно копошились у него перед глазами. «Что
          со мной случилось?» – подумал он.
        </Spoiler>
      )}
      getItemDescription={(size) => `size = ${size}`}
    />
  );
};

import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/Spoiler';
import { SpoilerPropButtonAlign } from '##/components/Spoiler/types';

const items: SpoilerPropButtonAlign[] = ['left', 'center', 'right'];

export const SpoilerExampleAlign = () => {
  return (
    <Example
      col={1}
      items={items}
      getItemNode={(align) => (
        <Spoiler lineClamp={3} buttonAlign={align}>
          Проснувшись однажды утром после беспокойного сна, Грегор Белый
          обнаружил, что он у себя в постели превратился в страшное насекомое.
          Лежа на твердой спине, он видел, стоило ему приподнять голову, свой
          коричневый, выпуклый, разделенный дугообразными чешуйками живот, на
          верхушке которого еле держалось готовое вот-вот окончательно сползти
          одеяло. Его многочисленные, убого тонкие по сравнению с остальным
          телом ножки беспомощно копошились у него перед глазами. «Что со мной
          случилось?» – подумал он.
        </Spoiler>
      )}
      getItemDescription={(size) => `buttonAlign = ${size}`}
    />
  );
};

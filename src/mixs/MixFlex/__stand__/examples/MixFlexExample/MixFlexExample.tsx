import './MixFlexExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cnMixFlex } from '##/mixs/MixFlex';
import { cn } from '##/utils/bem';

const cnMixFlexExample = cn('MixFlexExample');

export const MixFlexExample = () => {
  return (
    <Example>
      <div
        className={cnMixFlexExample(null, [
          cnMixFlex({
            wrap: 'wrap',
            justify: 'flex-start',
            align: 'flex-end',
            gap: 'xs',
          }),
        ])}
      >
        <div
          className={cnMixFlexExample('Block', [
            cnMixFlex({ align: 'center', justify: 'center' }),
          ])}
        >
          1
        </div>
        <div
          className={cnMixFlexExample('Block', [
            cnMixFlex({ align: 'center', justify: 'center' }),
          ])}
        >
          2
        </div>
        <div
          className={cnMixFlexExample('Block', [
            cnMixFlex({ align: 'center', justify: 'center' }),
          ])}
        >
          3
        </div>
        <div
          className={cnMixFlexExample('Block', [
            cnMixFlex({ align: 'center', justify: 'center', order: -1 }),
          ])}
        >
          4
        </div>
      </div>
    </Example>
  );
};

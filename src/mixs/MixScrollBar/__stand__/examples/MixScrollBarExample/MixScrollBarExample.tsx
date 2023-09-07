import './MixScrollBarExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cnMixScrollBar } from '##/mixs/MixScrollBar/MixScrollBar';
import { cn } from '##/utils/bem';

const cnMixScrollBarExample = cn('MixScrollBarExample');

export const MixScrollBarExample = () => {
  return (
    <Example>
      <div className={cnMixScrollBarExample(null, [cnMixScrollBar()])}>
        <div className={cnMixScrollBarExample('Block')} />
      </div>
    </Example>
  );
};

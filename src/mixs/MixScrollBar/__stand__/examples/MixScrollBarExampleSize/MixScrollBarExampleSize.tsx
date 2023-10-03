import './MixScrollBarExampleSize.css';

import { Example } from '@consta/stand';
import React from 'react';

import {
  cnMixScrollBar,
  MixScrollBarPropSize,
} from '##/mixs/MixScrollBar/MixScrollBar';
import { cn } from '##/utils/bem';

const items: MixScrollBarPropSize[] = ['xs', 's', 'm'];

const cnMixScrollBarExampleSize = cn('MixScrollBarExampleSize');

export const MixScrollBarExampleSize = () => {
  return (
    <Example
      items={items}
      getItemDescription={(size) => `size="${size}"`}
      getItemNode={(size) => (
        <div
          className={cnMixScrollBarExampleSize(null, [
            cnMixScrollBar({ size }),
          ])}
        >
          <div className={cnMixScrollBarExampleSize('Block')} />
        </div>
      )}
    />
  );
};

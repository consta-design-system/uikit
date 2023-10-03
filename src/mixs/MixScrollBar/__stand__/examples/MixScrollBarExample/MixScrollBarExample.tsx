import './MixScrollBarExample.css';

import { Example } from '@consta/stand';
import React from 'react';

import { cnMixScrollBar } from '##/mixs/MixScrollBar/MixScrollBar';
import { cn } from '##/utils/bem';

const cnMixScrollBarExample = cn('MixScrollBarExample');

export const MixScrollBarExample = () => {
  return (
    <Example
      items={[false, true]}
      getItemDescription={(invisible) => `invisible={${invisible}}`}
      getItemNode={(invisible) => (
        <div
          className={cnMixScrollBarExample(null, [
            cnMixScrollBar({ invisible }),
          ])}
        >
          <div className={cnMixScrollBarExample('Block', { color: 'red' })} />
          <div
            className={cnMixScrollBarExample('Block', { color: 'yellow' })}
          />
          <div className={cnMixScrollBarExample('Block', { color: 'green' })} />
        </div>
      )}
    />
  );
};

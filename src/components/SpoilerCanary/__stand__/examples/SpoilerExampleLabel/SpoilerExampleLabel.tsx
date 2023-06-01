import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';

export const SpoilerExampleLabel = () => {
  const [type, setType] = useState<'more' | 'less'>('more');

  return (
    <Example>
      <Spoiler
        type={type}
        lessLabel="Скрыть"
        moreLabel="Показать"
        onClick={() => setType(type === 'less' ? 'more' : 'less')}
      />
    </Example>
  );
};

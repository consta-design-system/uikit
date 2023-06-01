import { IconQuestion } from '@consta/icons/IconQuestion';
import { IconRemove } from '@consta/icons/IconRemove';
import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';

export const SpoilerExampleIcon = () => {
  const [type, setType] = useState<'more' | 'less'>('more');

  return (
    <Example>
      <Spoiler
        type={type}
        lessIcon={IconRemove}
        moreIcon={IconQuestion}
        onClick={() => setType(type === 'less' ? 'more' : 'less')}
      />
    </Example>
  );
};

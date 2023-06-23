import { IconQuestion } from '@consta/icons/IconQuestion';
import { IconRemove } from '@consta/icons/IconRemove';
import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';
import { useFlag } from '##/hooks/useFlag';

export const SpoilerExampleIcon = () => {
  const [isOpen, setIsOpen] = useFlag();

  return (
    <Example>
      <Spoiler
        open={isOpen}
        lessIcon={IconRemove}
        moreIcon={IconQuestion}
        onClick={setIsOpen.toggle}
      />
    </Example>
  );
};

import { IconArrowDown } from '@consta/icons/IconArrowDown';
import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';
import { useFlag } from '##/hooks/useFlag';

export const SpoilerExampleMode = () => {
  const [isOpen, setIsOpen] = useFlag();

  return (
    <Example>
      <Spoiler onClick={setIsOpen.toggle} open={isOpen} />
      <Spoiler
        onClick={setIsOpen.toggle}
        open={isOpen}
        moreIcon={IconArrowDown}
      />
    </Example>
  );
};

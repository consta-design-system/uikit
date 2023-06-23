import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';
import { useFlag } from '##/hooks/useFlag';

export const SpoilerExampleLabel = () => {
  const [isOpen, setIsOpen] = useFlag();

  return (
    <Example>
      <Spoiler
        open={isOpen}
        lessLabel="Скрыть"
        moreLabel="Показать"
        onClick={setIsOpen.toggle}
      />
    </Example>
  );
};

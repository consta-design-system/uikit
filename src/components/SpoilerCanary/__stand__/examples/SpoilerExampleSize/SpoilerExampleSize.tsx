import { Example } from '@consta/stand';
import React from 'react';

import { Spoiler } from '##/components/SpoilerCanary/Spoiler';
import { SpoilerPropSize } from '##/components/SpoilerCanary/types';
import { useFlag } from '##/hooks/useFlag';

const items: SpoilerPropSize[] = ['l', 'm', 's', 'xs'];

export const SpoilerExampleSize = () => {
  const [isOpen, setIsOpen] = useFlag();

  return (
    <Example
      col={{ 1: 0, 2: 400 }}
      items={items}
      getItemNode={(size) => (
        <Spoiler open={isOpen} onClick={setIsOpen.toggle} size={size} />
      )}
      getItemDescription={(size) => `size = ${size}`}
    />
  );
};

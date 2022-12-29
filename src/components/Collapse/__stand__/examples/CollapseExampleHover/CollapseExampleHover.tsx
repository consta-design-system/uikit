import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleHover = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
      <Collapse
        label="Здесь есть подсветка"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        hoverEffect
      >
        {content}
      </Collapse>
    </Example>
  );
};

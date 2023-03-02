import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconView = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
      <Collapse
        label="Это самый настоящий коллапс"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        iconView="ghost"
      >
        {content}
      </Collapse>
    </Example>
  );
};

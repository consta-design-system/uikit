import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleView = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);

  return (
    <Example col={1}>
      <Collapse
        label="Clear"
        view="clear"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Ghost"
        view="ghost"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
      >
        {content}
      </Collapse>
    </Example>
  );
};

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleIconDivider = () => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <Example>
      <Collapse
        label="Здесь есть разделитель"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        divider
      >
        {content}
      </Collapse>
    </Example>
  );
};

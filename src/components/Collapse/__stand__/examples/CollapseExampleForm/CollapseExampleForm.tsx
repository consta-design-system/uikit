import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleForm = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);
  const [isOpenThree, setIsOpenThree] = useState<boolean>(false);

  return (
    <Example col={1}>
      <Collapse
        label="Brick"
        form="brick"
        hoverEffect
        horizontalSpace="m"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Default"
        form="default"
        hoverEffect
        horizontalSpace="m"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Round"
        form="round"
        horizontalSpace="m"
        hoverEffect
        isOpen={isOpenThree}
        onClick={() => setIsOpenThree(!isOpenTwo)}
      >
        {content}
      </Collapse>
    </Example>
  );
};

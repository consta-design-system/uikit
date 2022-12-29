import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleSpace = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);
  const [isOpenThree, setOpenThree] = useState<boolean>(false);
  const [isOpenFour, setOpenFour] = useState<boolean>(false);
  const [isOpenFive, setOpenFive] = useState<boolean>(false);

  return (
    <Example col={1}>
      <Collapse
        label="Отступы 6xl"
        horizontalSpace="6xl"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
        hoverEffect
      >
        {content}
      </Collapse>
      <Collapse
        label="Отступы 3xl"
        horizontalSpace="3xl"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
        hoverEffect
      >
        {content}
      </Collapse>
      <Collapse
        label="Отступы xl"
        horizontalSpace="xl"
        isOpen={isOpenThree}
        onClick={() => setOpenThree(!isOpenThree)}
        hoverEffect
      >
        {content}
      </Collapse>
      <Collapse
        label="Отступы  s"
        horizontalSpace="s"
        isOpen={isOpenFour}
        onClick={() => setOpenFour(!isOpenFour)}
        hoverEffect
      >
        {content}
      </Collapse>
      <Collapse
        label="Отступы 3xs"
        horizontalSpace="3xs"
        isOpen={isOpenFive}
        onClick={() => setOpenFive(!isOpenFive)}
        hoverEffect
      >
        {content}
      </Collapse>
    </Example>
  );
};

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { content } from '../../../__mocks__/mock.data';
import { Collapse } from '../../../Collapse';

export const CollapseExampleSize = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);
  const [isOpenThree, setOpenThree] = useState<boolean>(false);
  const [isOpenFour, setOpenFour] = useState<boolean>(false);
  const [isOpenFive, setOpenFive] = useState<boolean>(false);

  return (
    <Example col={1}>
      <Collapse
        label="Самый большой коллапс"
        size="l"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Большой коллапс"
        size="m"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Средний коллапс"
        size="s"
        isOpen={isOpenThree}
        onClick={() => setOpenThree(!isOpenThree)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Маленький коллапс"
        size="xs"
        isOpen={isOpenFour}
        onClick={() => setOpenFour(!isOpenFour)}
      >
        {content}
      </Collapse>
      <Collapse
        label="Самый маленький коллапс"
        size="2xs"
        isOpen={isOpenFive}
        onClick={() => setOpenFive(!isOpenFive)}
      >
        {content}
      </Collapse>
    </Example>
  );
};

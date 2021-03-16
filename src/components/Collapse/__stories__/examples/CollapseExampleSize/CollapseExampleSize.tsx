import './CollapseExampleSize.css';

import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Collapse } from '../../../Collapse';

const cnExample = cn('CollapseExampleSize');

export const CollapseExampleSize = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);
  const [isOpenThree, setOpenThree] = useState<boolean>(false);
  const [isOpenFour, setOpenFour] = useState<boolean>(false);
  const [isOpenFive, setOpenFive] = useState<boolean>(false);

  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnExample()])}>
      <Collapse
        label="Самый большой коллапс"
        size="l"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        Это я!
      </Collapse>
      <Collapse
        label="Большой коллапс"
        size="m"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
      >
        Это я!
      </Collapse>
      <Collapse
        label="Средний коллапс"
        size="s"
        isOpen={isOpenThree}
        onClick={() => setOpenThree(!isOpenThree)}
      >
        Это я!
      </Collapse>
      <Collapse
        label="Маленький коллапс"
        size="xs"
        isOpen={isOpenFour}
        onClick={() => setOpenFour(!isOpenFour)}
      >
        Это я!
      </Collapse>
      <Collapse
        label="Самый маленький коллапс"
        size="2xs"
        isOpen={isOpenFive}
        onClick={() => setOpenFive(!isOpenFive)}
      >
        Это я!
      </Collapse>
    </StoryBookExample>
  );
};

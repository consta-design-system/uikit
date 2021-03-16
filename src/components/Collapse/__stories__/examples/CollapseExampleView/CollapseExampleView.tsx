import './CollapseExampleView.css';

import React, { useState } from 'react';
import { cn } from '@bem-react/classname';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Collapse } from '../../../Collapse';

const cnExample = cn('CollapseExampleView');

export const CollapseExampleView = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isOpenTwo, setOpenTwo] = useState<boolean>(false);

  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnExample()])}>
      <Collapse
        label="Primary"
        view="primary"
        size="xs"
        isOpen={isOpen}
        onClick={() => setOpen(!isOpen)}
      >
        View
      </Collapse>
      <Collapse
        label="Secondary"
        view="secondary"
        size="xs"
        isOpen={isOpenTwo}
        onClick={() => setOpenTwo(!isOpenTwo)}
      >
        View
      </Collapse>
    </StoryBookExample>
  );
};

import React, { useRef, useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuCanary';

type Item = {
  label: string;
  accent: 'alert' | 'warning' | 'success';
};

const items: Item[] = [
  {
    label: 'Пункт 1',
    accent: 'alert',
  },
  {
    label: 'Пункт 2',
    accent: 'warning',
  },
  {
    label: 'Пункт 3',
    accent: 'success',
  },
];

export const ContextMenuExampleStatus = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      <ContextMenu
        isOpen={isOpen}
        items={items}
        getItemStatus={(item) => item.accent}
        anchorRef={ref}
        direction="downStartLeft"
      />
    </StoryBookExample>
  );
};

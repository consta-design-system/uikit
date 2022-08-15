import React, { useRef, useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
  active?: boolean;
};

const items: Item[] = [
  {
    label: 'Пункт 1',
    active: true,
  },
  {
    label: 'Пункт 2',
    active: true,
  },
  {
    label: 'Пункт 3',
    active: false,
  },
];

export const ContextMenuExampleDisabled = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      <ContextMenu
        isOpen={isOpen}
        items={items}
        getItemDisabled={(item) => item.active}
        anchorRef={ref}
        direction="downStartLeft"
      />
    </StoryBookExample>
  );
};

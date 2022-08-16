import React, { useRef, useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

export const ContextMenuExampleLabel = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      <ContextMenu isOpen={isOpen} items={items} getItemLabel={(item) => item} anchorRef={ref} />
    </StoryBookExample>
  );
};

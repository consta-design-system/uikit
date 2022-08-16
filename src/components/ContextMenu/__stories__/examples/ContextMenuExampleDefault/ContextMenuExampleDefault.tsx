import React, { useRef, useState } from 'react';

import { exampleItems, groups } from '../../../__mocks__/mock.data';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

export const ContextMenuExampleDefault = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      <ContextMenu
        isOpen={isOpen}
        items={exampleItems}
        groups={groups}
        anchorRef={ref}
        onClickOutside={() => setIsOpen(false)}
        direction="downStartLeft"
      />
    </StoryBookExample>
  );
};

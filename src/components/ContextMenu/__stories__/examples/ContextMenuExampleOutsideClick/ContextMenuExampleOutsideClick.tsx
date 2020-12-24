import './ContextMenuExampleOutsideClick.css';

import React, { useRef, useState } from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

const cnContextMenuExampleOutsideClick = cn('ContextMenuExampleOutsideClick');

export const ContextMenuExampleOutsideClick = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnContextMenuExampleOutsideClick()])}>
      <Button iconLeft={IconAdd} ref={ref} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <ContextMenu
          items={items}
          getLabel={(item) => item}
          anchorRef={ref}
          direction="downStartLeft"
          onClickOutside={() => setIsOpen(false)}
          possibleDirections={['upStartLeft', 'downStartLeft']}
        />
      )}
    </StoryBookExample>
  );
};

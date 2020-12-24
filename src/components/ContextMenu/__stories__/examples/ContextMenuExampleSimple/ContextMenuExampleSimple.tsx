import './ContextMenuExampleSimple.css';

import React, { useRef } from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

const cnContextMenuExampleSimple = cn('ContextMenuExampleSimple');

export const ContextMenuExampleSimple = () => {
  const ref = useRef(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnContextMenuExampleSimple()])}>
      <Button iconLeft={IconAdd} ref={ref} />
      <ContextMenu
        items={items}
        getLabel={(item) => item}
        anchorRef={ref}
        direction="downStartLeft"
      />
    </StoryBookExample>
  );
};

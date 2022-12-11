import './ContextMenuExampleSimple.css';

import { IconAdd } from '@consta/icons/IconAdd';
import React, { useRef } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuDeprecated';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

const cnContextMenuExampleSimple = cn('ContextMenuExampleSimple');

export const ContextMenuExampleSimple = () => {
  const ref = useRef(null);
  return (
    <StoryBookExample
      className={cnDocsDecorator('Section', [cnContextMenuExampleSimple()])}
    >
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

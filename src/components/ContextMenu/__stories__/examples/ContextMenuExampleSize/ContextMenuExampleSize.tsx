import './ContextMenuExampleSize.css';

import React, { useRef } from 'react';

import { IconAdd } from '../../../../../icons/IconAdd/IconAdd';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

const cnContextMenuExampleSize = cn('ContextMenuExampleSize');

export const ContextMenuExampleSizeS = () => {
  const ref = useRef(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnContextMenuExampleSize()])}>
      <Button iconLeft={IconAdd} ref={ref} label="Меню размера S" />
      <ContextMenu
        items={items}
        getLabel={(item) => item}
        anchorRef={ref}
        direction="downStartLeft"
        size="s"
      />
    </StoryBookExample>
  );
};

export const ContextMenuExampleSizeM = () => {
  const ref = useRef(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnContextMenuExampleSize()])}>
      <Button iconLeft={IconAdd} ref={ref} label="Меню размера M" />
      <ContextMenu
        items={items}
        getLabel={(item) => item}
        anchorRef={ref}
        direction="downStartLeft"
        size="m"
      />
    </StoryBookExample>
  );
};

export const ContextMenuExampleSizeL = () => {
  const ref = useRef(null);
  return (
    <StoryBookExample className={cnDocsDecorator('Section', [cnContextMenuExampleSize()])}>
      <Button iconLeft={IconAdd} ref={ref} label="Меню размера L" />
      <ContextMenu
        items={items}
        getLabel={(item) => item}
        anchorRef={ref}
        direction="downStartLeft"
        size="l"
      />
    </StoryBookExample>
  );
};

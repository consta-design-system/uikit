import { IconComponent } from '@consta/icons/Icon';
import { IconAllDone } from '@consta/icons/IconAllDone';
import { IconAttach } from '@consta/icons/IconAttach';
import { IconBag } from '@consta/icons/IconBag';
import React, { useRef, useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenu';

type Item = {
  label: string;
  imageLeft?: IconComponent;
  imageRight?: IconComponent;
};

const items: Item[] = [
  {
    label: 'Скрепка',
    imageLeft: IconAttach,
  },
  {
    label: 'Две галочки',
    imageRight: IconAllDone,
  },
  {
    label: 'Чемодан',
    imageLeft: IconBag,
  },
];

export const ContextMenuExampleIcon = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      <ContextMenu
        isOpen={isOpen}
        items={items}
        getItemLeftIcon={(item) => item.imageLeft}
        getItemRightIcon={(item) => item.imageRight}
        anchorRef={ref}
        direction="downStartLeft"
      />
    </StoryBookExample>
  );
};

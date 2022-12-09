import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { IconComponent } from '../../../../../icons/Icon/Icon';
import { IconAllDone } from '../../../../../icons/IconAllDone/IconAllDone';
import { IconAttach } from '../../../../../icons/IconAttach/IconAttach';
import { IconBag } from '../../../../../icons/IconBag/IconBag';
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
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={items}
        getItemLeftIcon={(item) => item.imageLeft}
        getItemRightIcon={(item) => item.imageRight}
        anchorRef={ref}
        direction="downStartLeft"
      />
    </>
  );
};

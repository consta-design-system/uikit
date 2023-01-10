import { IconAdd } from '@consta/icons/IconAdd';
import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuDeprecated';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

export const ContextMenuExampleSimple = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useFlag();

  return (
    <>
      <Example>
        <Button iconLeft={IconAdd} ref={ref} onClick={setIsOpen.toggle} />
      </Example>
      {isOpen && (
        <ContextMenu
          items={items}
          getLabel={(item) => item}
          anchorRef={ref}
          direction="downStartLeft"
        />
      )}
    </>
  );
};

import { IconAdd } from '@consta/icons/IconAdd';
import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { ContextMenu } from '../../../ContextMenuDeprecated';

const items: string[] = ['Пункт 1', 'Пункт 2', 'Пункт 3'];

export const ContextMenuExampleOutsideClick = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <>
      <Example>
        <Button
          iconLeft={IconAdd}
          ref={ref}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Example>
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
    </>
  );
};

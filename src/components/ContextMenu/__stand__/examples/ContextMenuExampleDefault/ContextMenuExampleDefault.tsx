import { Example } from '@consta/stand';
import React, { useRef, useState } from 'react';

import { Button } from '../../../../Button/Button';
import { exampleItems, groups } from '../../../__mocks__/mock.data';
import { ContextMenu } from '../../../ContextMenu';

export const ContextMenuExampleDefault = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Example>
        <Button ref={ref} label="Открыть" onClick={() => setIsOpen(!isOpen)} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={exampleItems}
        groups={groups}
        anchorRef={ref}
        onClickOutside={() => setIsOpen(false)}
        direction="downStartLeft"
      />
    </>
  );
};

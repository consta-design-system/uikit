import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button';
import { ContextMenu } from '##/components/ContextMenu';
import { useFlag } from '##/hooks/useFlag';

import { exampleItems, groups } from '../../../__mocks__/mock.data';

export const ContextMenuExampleMobile = () => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useFlag();
  return (
    <>
      <Example>
        <Button ref={buttonRef} label="Открыть" onClick={setIsOpen.toggle} />
      </Example>
      <ContextMenu
        isOpen={isOpen}
        items={exampleItems}
        groups={groups}
        anchorRef={buttonRef}
        onClickOutside={setIsOpen.off}
        direction="upStartLeft"
        isMobile
      />
    </>
  );
};

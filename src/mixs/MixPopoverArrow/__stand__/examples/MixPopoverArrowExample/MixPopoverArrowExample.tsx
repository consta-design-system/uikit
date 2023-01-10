import './MixPopoverArrowExample.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '../../../../../components/Button/Button';
import { Popover } from '../../../../../components/Popover/Popover';
import { Text } from '../../../../../components/Text/Text';
import { useFlag } from '../../../../../hooks/useFlag/useFlag';
import { cn } from '../../../../../utils/bem';
import { cnMixPopoverArrow } from '../../../MixPopoverArrow';

const cnMixPopoverArrowExample = cn('MixPopoverArrowExample');

export const MixPopoverArrowExample = () => {
  const [open, setOpen] = useFlag(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Example>
        <Button label="Открыть" onClick={setOpen.toggle} ref={buttonRef} />
      </Example>
      {open && (
        <Popover
          className={cnMixPopoverArrowExample()}
          anchorRef={buttonRef}
          direction="downCenter"
          arrowOffset={16}
          offset={14}
        >
          {(direction) => {
            return (
              <>
                <Text>Позиция - {direction}</Text>
                <div className={cnMixPopoverArrow({ direction })} />
              </>
            );
          }}
        </Popover>
      )}
    </>
  );
};

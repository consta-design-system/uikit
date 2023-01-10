import './Popover.variants.css';

import { useBoolean, useNumber, useSelect, useText } from '@consta/stand';
import React, { useRef } from 'react';

import { useFlag } from '##/hooks/useFlag';

import { cn } from '../../../utils/bem';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';
import { directions, Popover, popoverPropOffset } from '../Popover';

const cnPopoverVariants = cn('PopoverVariants');

const Variants = () => {
  const text = useText(
    'children',
    'Это содержимое поповера: здесь может быть что угодно, например, этот текст.',
  );
  const direction = useSelect('direction', directions, 'upCenter');
  const offset = useSelect('offset', popoverPropOffset, '2xs');
  const arrowOffset = useNumber('arrowOffset', 0);
  const isInteractive = useBoolean('isInteractive', false);

  const [open, setOpen] = useFlag();
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className={cnPopoverVariants()}>
        <Button
          label="Нажмите меня"
          type="button"
          onClick={setOpen.toggle}
          ref={anchorRef}
        />
      </div>
      {open && (
        <Popover
          offset={offset}
          arrowOffset={arrowOffset}
          anchorRef={anchorRef}
          direction={direction}
          onClickOutside={setOpen.off}
          isInteractive={isInteractive}
        >
          <Text className={cnPopoverVariants('Content')}>{text}</Text>
        </Popover>
      )}
    </>
  );
};

export default Variants;

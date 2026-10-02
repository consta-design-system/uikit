import './MixPopoverAnimateExample.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';

import { Button } from '##/components/Button/Button';
import { Popover } from '##/components/Popover/Popover';
import { Transition } from '##/components/Transition';
import { useFlag } from '##/hooks/useFlag/useFlag';
import { cn } from '##/utils/bem';

import {
  animateTimeout,
  cnMixPopoverAnimate,
} from '../../../MixPopoverAnimate';

const cnMixPopoverAnimateExample = cn('MixPopoverAnimateExample');

export const MixPopoverAnimateExampleRenderFn = () => {
  const [open, setOpen] = useFlag();
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Example>
        <Button
          className={cnMixPopoverAnimateExample('Button')}
          label="Нажми"
          onClick={setOpen.toggle}
          ref={buttonRef}
        />
      </Example>
      <Transition in={open} unmountOnExit timeout={animateTimeout}>
        {(animate) => {
          return (
            <Popover
              className={cnMixPopoverAnimateExample('Popover', [
                cnMixPopoverAnimate({ animate }),
              ])}
              offset="xs"
              anchorRef={buttonRef}
              ref={popoverRef}
              direction="downStartLeft"
            >
              я появился плавно <br /> c анимацией 🔥
            </Popover>
          );
        }}
      </Transition>
    </>
  );
};

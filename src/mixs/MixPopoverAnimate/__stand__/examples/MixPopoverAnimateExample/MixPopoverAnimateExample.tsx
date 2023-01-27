import './MixPopoverAnimateExample.css';

import { Example } from '@consta/stand';
import React, { useRef } from 'react';
import { CSSTransition, Transition } from 'react-transition-group';

import { Button } from '../../../../../components/Button/Button';
import { Popover } from '../../../../../components/Popover/Popover';
import { useFlag } from '../../../../../hooks/useFlag/useFlag';
import { cn } from '../../../../../utils/bem';
import {
  animateTimeout,
  cnMixPopoverAnimate,
  cnMixPopoverAnimateForCssTransition,
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
      <Transition
        in={open}
        unmountOnExit
        timeout={animateTimeout}
        nodeRef={popoverRef}
      >
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

export const MixPopoverAnimateExampleForCssTransition = () => {
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
      <CSSTransition
        in={open}
        unmountOnExit
        classNames={cnMixPopoverAnimateForCssTransition}
        timeout={animateTimeout}
        nodeRef={popoverRef}
      >
        <Popover
          className={cnMixPopoverAnimateExample('Popover')}
          offset="xs"
          anchorRef={buttonRef}
          ref={popoverRef}
          direction="downStartLeft"
        >
          я появился плавно <br /> c анимацией 🔥
        </Popover>
      </CSSTransition>
    </>
  );
};

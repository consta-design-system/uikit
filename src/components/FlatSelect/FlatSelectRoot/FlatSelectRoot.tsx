import './FlatSelectRoot.css';

import { AtomLike } from '@reatom/core';
import { useAtom } from '@reatom/react';
import React, { forwardRef } from 'react';

import { Direction, Popover } from '##/components/Popover';
import { Transition } from '##/components/Transition';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type FlatSelectRootProps = PropsWithHTMLAttributesAndRef<
  {
    anchorRef?: React.RefObject<HTMLElement>;
    openAtom: AtomLike<boolean>;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: Direction[];
    viewportRef?: React.RefObject<HTMLElement>;
    container?: Element;
  },
  HTMLDivElement
>;

export const cnFlatSelectRoot = cn('FlatSelectRoot');

export const FlatSelectRoot: React.FC<FlatSelectRootProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      anchorRef,
      openAtom,
      direction = 'downStartLeft',
      spareDirection = 'downStartLeft',
      possibleDirections = [
        'downStartLeft',
        'downStartRight',
        'upStartLeft',
        'upStartRight',
        'leftStartDown',
        'leftStartUp',
      ],
      viewportRef,
      container,
      ...otherProps
    } = props;

    const withAnchor = !!anchorRef;
    const [open] = useAtom(openAtom);

    if (withAnchor) {
      return (
        <Transition in={open} unmountOnExit timeout={animateTimeout}>
          {(animate) => (
            <Popover
              {...otherProps}
              className={cnFlatSelectRoot({ withAnchor }, [
                className,
                cnMixPopoverAnimate({ animate }),
              ])}
              ref={ref}
              anchorRef={anchorRef}
              equalAnchorWidth
              offset="2xs"
              direction={direction}
              spareDirection={spareDirection}
              possibleDirections={possibleDirections}
              viewportRef={viewportRef}
              container={container}
              role="listbox"
            />
          )}
        </Transition>
      );
    }

    return (
      <div
        {...otherProps}
        className={cnFlatSelectRoot(null, [className])}
        ref={ref}
        role="listbox"
      />
    );
  },
);

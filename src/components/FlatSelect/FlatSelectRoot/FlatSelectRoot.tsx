import './FlatSelectRoot.css';

import { AtomMut } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import React, { forwardRef, useRef } from 'react';
import { Transition } from 'react-transition-group';

import { Direction, Popover } from '##/components/Popover';
import { useForkRef } from '##/hooks/useForkRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type FlatSelectRootProps = PropsWithHTMLAttributesAndRef<
  {
    anchorRef?: React.RefObject<HTMLElement>;
    openAtom: AtomMut<boolean>;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: Direction[];
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
      ...otherProps
    } = props;

    const contentRef = useRef(null);
    const contentForkedRef = useForkRef([contentRef, ref]);
    const withAnchor = !!anchorRef;
    const [open] = useAtom(openAtom);

    if (withAnchor) {
      return (
        <Transition
          in={open}
          unmountOnExit
          timeout={animateTimeout}
          nodeRef={contentRef}
        >
          {(animate) => (
            <Popover
              {...otherProps}
              className={cnFlatSelectRoot({ withAnchor }, [
                className,
                cnMixPopoverAnimate({ animate }),
              ])}
              ref={contentForkedRef}
              anchorRef={anchorRef}
              equalAnchorWidth
              offset="2xs"
              direction={direction}
              spareDirection={spareDirection}
              possibleDirections={possibleDirections}
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
      />
    );
  },
);

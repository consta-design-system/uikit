import './ColorPickerRoot.css';

import React, { forwardRef, useCallback, useEffect, useRef } from 'react';

import { Direction, Popover } from '##/components/Popover';
import { Transition } from '##/components/Transition';
import { useDebounce } from '##/hooks/useDebounce';
import { useFlag } from '##/hooks/useFlag';
import { useForkRef } from '##/hooks/useForkRef';
import { useKeys } from '##/hooks/useKeys';
import { useKeysRef } from '##/hooks/useKeysRef';
import { animateTimeout, cnMixPopoverAnimate } from '##/mixs/MixPopoverAnimate';
import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributesAndRef } from '##/utils/types/PropsWithHTMLAttributes';

export type ColorPickerRootProps = PropsWithHTMLAttributesAndRef<
  {
    anchorRef?: React.RefObject<HTMLElement>;
    controlRef?: React.RefObject<HTMLElement>;
    direction?: Direction;
    spareDirection?: Direction;
    possibleDirections?: Direction[];
    viewportRef?: React.RefObject<HTMLElement>;
    onOpen?: (open: boolean) => void;
    open?: boolean;
    container?: HTMLElement;
  },
  HTMLDivElement
>;

export const cnColorPickerRoot = cn('ColorPickerRoot');
const emptyRef = { current: null };

export const ColorPickerRoot: React.FC<ColorPickerRootProps> = forwardRef(
  (props, ref) => {
    const {
      className,
      anchorRef: anchorRefProp = props.controlRef,
      controlRef: controlRefProp = props.anchorRef,
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
      onOpen,
      open: openProp,
      container,
      ...otherProps
    } = props;

    const contentRef = useRef<HTMLDivElement>(null);
    const contentForkedRef = useForkRef([contentRef, ref]);

    const withAnchor = !!anchorRefProp;
    const anchorRef = anchorRefProp || emptyRef;
    const controlRef = controlRefProp || emptyRef;
    const [open, setOpen] = useFlag(openProp);
    const focus = useDebounce(() => contentRef.current?.focus(), 15);
    const handleClose = useCallback(() => {
      setOpen.off();
      if (controlRef.current) {
        controlRef.current.focus();
      }
    }, []);

    const handleOpen = useCallback(() => {
      setOpen.on();
      focus();
    }, []);

    const handelToggle = useCallback(() => {
      if (open) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [open]);

    useKeysRef({
      ref: controlRef,
      isActive: withAnchor && open,
      keys: { Escape: handleClose },
    });

    const handelKeys = useKeys({
      isActive: open,
      keys: {
        Escape: handleClose,
      },
    });

    useEffect(() => {
      controlRef.current?.addEventListener('click', handelToggle);

      return () => {
        controlRef.current?.removeEventListener('click', handelToggle);
      };
    }, [withAnchor]);

    useEffect(() => {
      onOpen?.(open);
    }, [open]);

    useEffect(() => {
      setOpen.set(!!openProp);
    }, [openProp]);

    if (withAnchor) {
      return (
        <Transition in={open} unmountOnExit timeout={animateTimeout}>
          {(animate) => (
            <Popover
              {...otherProps}
              className={cnColorPickerRoot({ withAnchor }, [
                className,
                cnMixPopoverAnimate({ animate }),
              ])}
              ref={contentForkedRef}
              anchorRef={anchorRef}
              offset="2xs"
              direction={direction}
              spareDirection={spareDirection}
              possibleDirections={possibleDirections}
              viewportRef={viewportRef}
              onClickOutside={handleClose}
              tabIndex={0}
              role="dialog"
              onKeyUp={handelKeys}
              container={container}
            />
          )}
        </Transition>
      );
    }

    return (
      <div
        {...otherProps}
        className={cnColorPickerRoot(null, [className])}
        ref={ref}
      />
    );
  },
);

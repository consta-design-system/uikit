import './ColorPickerInteractive.css';

import React, { useEffect, useMemo, useRef } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { useEventCallback } from '../hooks/useEventCallback';
import { clamp } from '../utils/clamp';

export const cnColorPickerInteractive = cn('ColorPickerInteractive');

export interface Interaction {
  left: number;
  top: number;
}

const isTouch = (event: MouseEvent | TouchEvent): event is TouchEvent =>
  'touches' in event;

const getTouchPoint = (touches: TouchList, touchId: null | number): Touch => {
  for (let i = 0; i < touches.length; i++) {
    if (touches[i].identifier === touchId) return touches[i];
  }
  return touches[0];
};

const getParentWindow = (node?: HTMLDivElement | null): Window => {
  // eslint-disable-next-line no-restricted-globals
  return (node && node.ownerDocument.defaultView) || self;
};

const getRelativePosition = (
  node: HTMLDivElement,
  event: MouseEvent | TouchEvent,
  touchId: null | number,
): Interaction => {
  const rect = node.getBoundingClientRect();

  const pointer = isTouch(event)
    ? getTouchPoint(event.touches, touchId)
    : (event as MouseEvent);

  return {
    left: clamp(
      (pointer.pageX - (rect.left + getParentWindow(node).pageXOffset)) /
        rect.width,
    ),
    top: clamp(
      (pointer.pageY - (rect.top + getParentWindow(node).pageYOffset)) /
        rect.height,
    ),
  };
};

const preventDefaultMove = (event: MouseEvent | TouchEvent): void => {
  !isTouch(event) && event.preventDefault();
};

const isInvalid = (
  event: MouseEvent | TouchEvent,
  hasTouch: boolean,
): boolean => {
  return hasTouch && !isTouch(event);
};

type Props = PropsWithHTMLAttributes<
  {
    onMove: (interaction: Interaction) => void;
    onKey: (offset: Interaction) => void;
    children: React.ReactNode;
  },
  HTMLDivElement
>;

export const ColorPickerInteractive = ({
  onMove,
  onKey,
  className,
  ...rest
}: Props) => {
  const container = useRef<HTMLDivElement>(null);
  const onMoveCallback = useEventCallback<Interaction>(onMove);
  const onKeyCallback = useEventCallback<Interaction>(onKey);
  const touchId = useRef<null | number>(null);

  const hasTouch = useRef(false);

  const [handleMoveStart, handleKeyDown, toggleDocumentEvents] = useMemo(() => {
    const handleMoveStart = ({
      nativeEvent,
    }: React.MouseEvent | React.TouchEvent) => {
      const el = container.current;
      if (!el) return;

      // Prevent text selection
      preventDefaultMove(nativeEvent);

      if (isInvalid(nativeEvent, hasTouch.current) || !el) return;

      if (isTouch(nativeEvent)) {
        hasTouch.current = true;
        const changedTouches = nativeEvent.changedTouches || [];
        if (changedTouches.length)
          touchId.current = changedTouches[0].identifier;
      }

      el.focus();

      onMoveCallback(getRelativePosition(el, nativeEvent, touchId.current));
      toggleDocumentEvents(true);
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      preventDefaultMove(event);

      const isDown = isTouch(event)
        ? event.touches.length > 0
        : event.buttons > 0;

      if (isDown && container.current) {
        onMoveCallback(
          getRelativePosition(container.current, event, touchId.current),
        );
      } else {
        toggleDocumentEvents(false);
      }
    };

    const handleMoveEnd = () => toggleDocumentEvents(false);

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const keyCode = event.which || event.keyCode;

      if (keyCode < 37 || keyCode > 40) return;

      event.preventDefault();
      onKeyCallback({
        // eslint-disable-next-line no-nested-ternary
        left: keyCode === 39 ? 0.05 : keyCode === 37 ? -0.05 : 0,
        // eslint-disable-next-line no-nested-ternary
        top: keyCode === 40 ? 0.05 : keyCode === 38 ? -0.05 : 0,
      });
    };

    function toggleDocumentEvents(state?: boolean) {
      const touch = hasTouch.current;
      const el = container.current;
      const parentWindow = getParentWindow(el);

      // Add or remove additional pointer event listeners
      const toggleEvent = state
        ? parentWindow.addEventListener
        : parentWindow.removeEventListener;
      toggleEvent(touch ? 'touchmove' : 'mousemove', handleMove);
      toggleEvent(touch ? 'touchend' : 'mouseup', handleMoveEnd);
    }

    return [handleMoveStart, handleKeyDown, toggleDocumentEvents];
  }, [onKeyCallback, onMoveCallback]);

  useEffect(() => toggleDocumentEvents, [toggleDocumentEvents]);

  return (
    <>
      <div
        role="button"
        aria-hidden="true"
        tabIndex={-1}
        className={cnColorPickerInteractive('LeftButton')}
        onClick={() =>
          onMoveCallback({
            left: 0,
            top: 0,
          })
        }
      />
      <div
        {...rest}
        className={cnColorPickerInteractive(null, [className])}
        onTouchStart={handleMoveStart}
        onMouseDown={handleMoveStart}
        ref={container}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
      />
      <div
        role="button"
        aria-hidden="true"
        tabIndex={-1}
        className={cnColorPickerInteractive('RightButton')}
        onClick={() =>
          onMoveCallback({
            left: 1,
            top: 0,
          })
        }
      />
    </>
  );
};

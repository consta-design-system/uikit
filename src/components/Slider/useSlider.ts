import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import {
  asc,
  clamp,
  doesSupportTouchActionNone,
  findClosest,
  getDividedValue,
  ownerDocument,
  percentToValue,
  roundValueToStep,
  setValueIndex,
  trackFinger,
} from './helpers';
import { SliderProps } from './Slider';

type PositionType = {
  x: number;
  y: number;
};

export default (props: SliderProps, { clearActive }: { clearActive: () => void }) => {
  const { step = 1, min, max, value, disabled, onChange, onChangeCommitted, onAfterChange } = props;

  const minValue = max > min ? min : 0;
  const maxValue = max > min ? max : 100;

  const [valueDerived, setValueState] = useState<number | number[]>(value || 0);

  const [dividedValue, setDividedValue] = useState(getDividedValue(step, maxValue - minValue));

  const range = useRef(Array.isArray(valueDerived));
  const values = useRef<number | number[]>(0);
  const valueDerivedRef = useRef<number | number[]>(valueDerived);
  values.current = range.current
    ? (valueDerived as number[]).slice().sort(asc)
    : [valueDerived as number];
  valueDerivedRef.current = valueDerived;

  const [dragging, setDragging] = useState<boolean>(false);
  const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const moveCount = React.useRef(0);
  const touchId: MutableRefObject<number | null> = React.useRef<number>(null);
  const previousIndex = React.useRef<number>(0);
  const localStep = useRef(step || 0);
  const pointValueOne = useRef<HTMLButtonElement | null>(null);
  const pointValueTwo = useRef<HTMLButtonElement | null>(null);

  const sliderRef = React.useRef<HTMLDivElement>(null);

  const getFingerNewValue = useCallback(
    (finger: PositionType, move: boolean, source: number | number[]) => {
      const { current: slider } = sliderRef;
      if (!slider) return;
      const { width, left } = slider.getBoundingClientRect();
      const percent = (finger.x - left) / width;

      let temporaryValue: number;
      temporaryValue = percentToValue(percent, minValue, maxValue);
      if (localStep.current) {
        temporaryValue = roundValueToStep(temporaryValue, localStep.current, minValue);
      }

      temporaryValue = clamp(temporaryValue, minValue, maxValue);
      let activeIndex = 0;

      if (range.current) {
        if (!move) {
          activeIndex = findClosest(values.current as number[], temporaryValue);
        } else {
          activeIndex = previousIndex.current;
        }

        if (disabled) {
          temporaryValue = clamp(
            temporaryValue,
            (values.current as number[])[activeIndex - 1] || -Infinity,
            (values.current as number[])[activeIndex + 1] || Infinity,
          );
        }

        const previousValue = temporaryValue;
        const newValue = setValueIndex(
          values.current as number[],
          source as number[],
          temporaryValue,
          activeIndex,
        ).sort(asc);

        if (!(disabled && move)) {
          activeIndex = newValue.indexOf(previousValue);
          previousIndex.current = activeIndex;
        }

        return { newValue, activeIndex };
      }

      return { newValue: temporaryValue, activeIndex };
    },
    [minValue, maxValue],
  );

  const handleTouchMove = useCallback<EventListener>(
    (event) => {
      const nativeEvent = event as MouseEvent | TouchEvent;
      const finger = trackFinger(nativeEvent, touchId);

      if (!finger) return;

      moveCount.current += 1;

      if ('buttons' in nativeEvent && (nativeEvent as MouseEvent).buttons === 0) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        handleTouchEnd(nativeEvent);
        return;
      }

      const fingerNewValue = getFingerNewValue(finger, true, valueDerivedRef.current);
      if (!fingerNewValue) return;
      const { newValue, activeIndex } = fingerNewValue;

      if (!dragging && moveCount.current > 2) {
        setDragging(true);
      }

      onChange?.(
        nativeEvent,
        Array.isArray(newValue) ? newValue[activeIndex] : newValue,
        activeIndex,
      );

      if (
        Array.isArray(newValue) && Array.isArray(valueDerivedRef.current)
          ? newValue[0] !== valueDerivedRef.current[0] || newValue[1] !== valueDerivedRef.current[1]
          : newValue !== valueDerivedRef.current
      ) {
        setValueState(newValue);

        if (onChangeCommitted) {
          onChangeCommitted(nativeEvent, Array.isArray(newValue) ? newValue : [newValue]);
        }

        const rect = (activeIndex || !range.current
          ? pointValueTwo
          : pointValueOne
        ).current?.getBoundingClientRect();
        if (!rect) return;
        setPopoverPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
    },
    [getFingerNewValue],
  );

  const handleTouchEnd = useCallback<EventListener>(
    (event) => {
      const nativeEvent = event as TouchEvent;
      const finger = trackFinger(nativeEvent, touchId);
      setDragging(false);

      if (!finger) return;

      const fingerNewValue = getFingerNewValue(finger, true, valueDerivedRef.current);
      if (!fingerNewValue) return;
      const { newValue, activeIndex } = fingerNewValue;

      if (onChangeCommitted) {
        onChangeCommitted(nativeEvent, Array.isArray(newValue) ? newValue : [newValue]);
      }
      clearActive();

      onAfterChange?.(
        nativeEvent,
        Array.isArray(newValue) ? newValue[activeIndex] : newValue,
        activeIndex,
      );

      touchId.current = null;
    },
    [getFingerNewValue],
  );

  const handleDragStart = useCallback(
    (nativeEvent: React.MouseEvent | React.TouchEvent) => {
      const finger = trackFinger(nativeEvent, touchId);

      if (!finger) return;

      const fingerNewValue = getFingerNewValue(finger, true, valueDerivedRef.current);
      if (!fingerNewValue) return;
      const { newValue, activeIndex } = fingerNewValue;

      setValueState(newValue);

      onChange?.(
        nativeEvent,
        Array.isArray(newValue) ? newValue[activeIndex] : newValue,
        activeIndex,
      );

      moveCount.current = 0;
      const doc = ownerDocument(sliderRef.current);
      doc.addEventListener('touchmove', handleTouchMove);
      doc.addEventListener('touchend', handleTouchEnd);

      const rect = (activeIndex || !range.current
        ? pointValueTwo
        : pointValueOne
      ).current?.getBoundingClientRect();
      if (!rect) return;
      setPopoverPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    },
    [getFingerNewValue],
  );

  const handleTouchStart = useCallback(
    (nativeEvent: React.TouchEvent) => {
      if (!doesSupportTouchActionNone()) {
        nativeEvent.preventDefault();
      }

      const touch = 'changedTouches' in nativeEvent ? nativeEvent.changedTouches[0] : null;
      if (touch != null) {
        touchId.current = touch.identifier;
      }
      handleDragStart(nativeEvent);
    },
    [handleDragStart],
  );

  const handleMouseDown = useCallback(
    (nativeEvent: React.MouseEvent) => {
      if (nativeEvent.button !== 0) return;

      nativeEvent.preventDefault();
      handleDragStart(nativeEvent);
    },
    [handleDragStart],
  );

  const stopListening = useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchmove', handleTouchMove);
    doc.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  React.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);

  useEffect(() => {
    localStep.current = Array.isArray(step)
      ? getDividedValue(step, maxValue - minValue)
      : step || 0;
    setDividedValue(getDividedValue(step, maxValue - minValue));
  }, [step, maxValue, minValue]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setValueState(value);
      range.current = true;
    } else if (!Array.isArray(value) && value !== undefined) {
      setValueState(value);
      range.current = false;
    }
  }, [value]);

  return {
    handleTouchStart,
    handleMouseDown,
    popoverPosition,
    sliderRef,
    valueDerived,
    dividedValue,
    minValue,
    maxValue,
    range,
    stopListening,
  };
};

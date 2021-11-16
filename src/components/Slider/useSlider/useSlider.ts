import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useComponentSize } from '../../../hooks/useComponentSize/useComponentSize';
import { SliderValue, TrackPosition } from '../helper';
import { getSteps } from '../useSliderStationing';

import {
  ActiveButton,
  detectActiveButton,
  getActiveValue,
  getValidValue,
  getValueByPosition,
  isNotRangeParams,
  isRangeParams,
  trackPosition,
  UseSliderProps,
  UseSliderValues,
} from './helper';

export function useSlider<RANGE extends boolean>(props: UseSliderProps<RANGE>): UseSliderValues {
  const {
    disabled,
    range,
    value,
    min,
    max,
    step = 1,
    onChange,
    onAfterChange,
    sliderRef,
    buttonRefs,
  } = props;

  const minValue = max > min ? min : 0;
  const maxValue = max > min ? max : 100;

  const [currentValue, setCurrentValue] = useState<number | [number, number]>(value);

  const popoverPosition: MutableRefObject<TrackPosition[]> = useRef([]);
  const activeButton: MutableRefObject<ActiveButton | null> = useRef(null);

  const sizeSlider = useComponentSize(sliderRef);

  useEffect(() => {
    if (typeof value !== 'undefined' && typeof step !== 'undefined') {
      const targetValue = isRangeParams(props)
        ? ([
            getValidValue(props.value[0], min, max, step),
            getValidValue(props.value[1], min, max, step),
          ] as [number, number])
        : getValidValue(props.value as number, min, max, step);
      setCurrentValue(targetValue);
    }
  }, [range, typeof value]);

  useEffect(() => {
    if (isRangeParams(props)) {
      if (props.value[0] > props.value[1]) {
        const newValue: SliderValue<true> = [props.value[1], props.value[1]];
        props.onChange?.({ value: newValue });
      }
    }
  }, []);

  const analyzeDivisionValue = useCallback(
    (value: number) => {
      const steps = getSteps(step, minValue, maxValue);
      let newValue: number = value;
      steps.forEach((stepSize) => {
        if (value && stepSize.min < value && stepSize.max >= value) {
          if ((stepSize.max + stepSize.min) / 2 > value) {
            newValue = stepSize.min;
          } else {
            newValue = stepSize.max;
          }
        }
      });
      return newValue;
    },
    [step, min, max],
  );

  const onKeyPress = (event: React.KeyboardEvent) => {
    if (!disabled && typeof activeButton.current === 'string' && typeof value !== 'undefined') {
      let stepIncrement = !Array.isArray(step) ? step || 1 : 1;
      let validKeyCode = false;
      const changedValue = getActiveValue(value, activeButton.current);
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowRight':
        case '+':
          validKeyCode = true;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
        case '-':
          validKeyCode = true;
          stepIncrement *= -1;
          break;
        default:
          break;
      }
      if (validKeyCode) {
        if (Array.isArray(step)) {
          let stepsArr = [...step];
          if (step[0] !== minValue) {
            stepsArr = [minValue, ...stepsArr];
          }
          if (step[step.length - 1] !== maxValue) {
            stepsArr = [...stepsArr, maxValue];
          }
          stepsArr.forEach((stepPoint, index) => {
            if (typeof activeButton.current === 'string' && changedValue === stepPoint) {
              if (stepIncrement >= 0) {
                if (index === 0) {
                  stepIncrement = stepsArr[1] - minValue;
                } else {
                  stepIncrement =
                    (typeof stepsArr[index + 1] !== 'undefined' ? stepsArr[index + 1] : maxValue) -
                    stepPoint;
                }
              } else if (index === 0) {
                stepIncrement = minValue - stepsArr[1];
              } else {
                stepIncrement =
                  (typeof stepsArr[index - 1] !== 'undefined' ? stepsArr[index - 1] : minValue) -
                  stepPoint;
              }
            }
          });
        }
        const newValue = getNewValue(changedValue + stepIncrement, step);
        setCurrentValue(newValue);
        setTooltipPosition(getActiveValue(newValue, activeButton.current));
        onChange?.({
          e: event,
          value: newValue,
        });
      }
    }
  };

  const getNewValue = (changedValue: number, step: number | number[]): SliderValue<RANGE> => {
    let maxRangeValue = maxValue;
    let minRangeValue = minValue;
    if (Array.isArray(value)) {
      const [left, right] = value;
      if (activeButton.current === 'right') {
        minRangeValue = left;
      } else {
        maxRangeValue = right;
      }
    }
    const analyzedValue = getValidValue(
      analyzeDivisionValue(changedValue),
      minRangeValue,
      maxRangeValue,
      step,
    );
    if (isRangeParams(props)) {
      return (activeButton.current === 'right'
        ? [props.value[0], analyzedValue]
        : [analyzedValue, props.value[1]]) as SliderValue<RANGE>;
    }
    return analyzedValue as SliderValue<RANGE>;
  };

  const setTooltipPosition = useCallback(
    (value: number) => {
      if (sliderRef.current) {
        const button =
          buttonRefs[activeButton.current === 'left' ? 0 : 1].current || sliderRef.current;
        const { x, width } = sliderRef.current.getBoundingClientRect();
        const newPosition = {
          y: button.offsetTop + button.offsetHeight + 50,
          x: x + Math.abs((value - minValue) / (maxValue - minValue)) * width,
        };
        popoverPosition.current[activeButton.current === 'left' ? 0 : 1] = newPosition;
      }
    },
    [sliderRef, minValue, maxValue],
  );

  const changePosition = useCallback(
    (event: Event) => {
      const nativeEvent = event as MouseEvent | TouchEvent;
      let newValue: typeof value = value;
      if (typeof activeButton.current === 'string') {
        const position = trackPosition(nativeEvent);
        const currentValue = getValueByPosition(position, sliderRef, minValue, maxValue);
        newValue = getNewValue(currentValue, step);
      }
      return newValue;
    },
    [sliderRef, value, activeButton, range, step],
  );

  const onFocus = (e: React.FocusEvent, button: ActiveButton) => {
    activeButton.current = button;
  };

  const handleTouchMove = useCallback<EventListener>(
    (event) => {
      if (typeof activeButton.current === 'string') {
        const nativeEvent = event as MouseEvent | TouchEvent;
        const position = changePosition(event);
        const oldValue: number = getActiveValue(currentValue, activeButton.current);
        const newValue: number = getActiveValue(position, activeButton.current);
        if (oldValue !== newValue) {
          setTooltipPosition(newValue);
          setCurrentValue(position);
          onAfterChange?.({ e: nativeEvent, value: position });
        }
      }
    },
    [sliderRef, value, activeButton, step, currentValue],
  );

  const handleTouchEnd = useCallback<EventListener>(
    (event: Event) => {
      const position = changePosition(event);
      if (typeof position !== 'undefined') {
        setCurrentValue(position);
        onChange?.({ e: event, value: position });
      }
      stopListening();
      activeButton.current = null;
    },
    [sliderRef, value, activeButton, step],
  );

  const handleDragStart = useCallback(
    (
      nativeEvent: React.MouseEvent | React.TouchEvent,
      eventMove: 'touchmove' | 'mousemove',
      eventEnd: 'touchend' | 'mouseup',
    ) => {
      if (!disabled) {
        const buttonSide = detectActiveButton(trackPosition(nativeEvent), buttonRefs);
        activeButton.current = buttonSide;
        if (typeof buttonSide === 'string') {
          const doc = sliderRef.current || document;
          doc.addEventListener(eventEnd, handleTouchEnd);
          doc.addEventListener(eventMove, handleTouchMove);
        }
      }
    },
    [sliderRef, buttonRefs],
  );

  const handleTouchStart = useCallback(
    (nativeEvent: React.TouchEvent) => {
      handleDragStart(nativeEvent, 'touchmove', 'touchend');
    },
    [handleDragStart],
  );

  const handleMouseDown = useCallback(
    (nativeEvent: React.MouseEvent) => {
      handleDragStart(nativeEvent, 'mousemove', 'mouseup');
    },
    [handleDragStart],
  );

  useEffect(() => {
    if (isRangeParams(props)) {
      props.value.forEach((val, index) => {
        activeButton.current = index === 0 ? 'left' : 'right';
        setTooltipPosition(getActiveValue(val, activeButton.current));
      });
    }
    if (isNotRangeParams(props)) {
      activeButton.current = 'left';
      setTooltipPosition(getActiveValue(value, activeButton.current));
    }
    activeButton.current = null;
  }, [sizeSlider, typeof value]);

  const stopListening = useCallback(() => {
    const doc = sliderRef.current || document;
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchend', handleTouchEnd);
    doc.removeEventListener('mousemove', handleTouchMove);
    doc.removeEventListener('touchmove', handleTouchMove);
  }, [handleTouchEnd]);

  useEffect(() => {
    if (disabled) stopListening();
  }, [disabled, stopListening]);

  return {
    handleTouchStart,
    handleMouseDown,
    onKeyPress,
    onFocus,
    stopListening,
    activeButton: activeButton.current,
    popoverPosition: popoverPosition.current,
    currentValue,
  };
}

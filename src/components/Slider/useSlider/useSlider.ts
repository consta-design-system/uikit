import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { SliderValue, TrackPosition } from '../helper';
import { getSteps } from '../useSliderStationing';

import {
  ActiveButton,
  detectActiveButton,
  getValidValue,
  getValueByPosition,
  isRangeParams,
  trackPosition,
  UseSliderProps,
  UseSliderValues,
} from './helper';

export function useSlider<RANGE extends boolean>(props: UseSliderProps<RANGE>): UseSliderValues {
  const { disabled, range, value, min, max, step = 1, onChange, sliderRef, buttonRefs } = props;

  const minValue = max > min ? min : 0;
  const maxValue = max > min ? max : 100;

  const activeButton: MutableRefObject<ActiveButton | null> = useRef(null);

  const popoverPosition: MutableRefObject<TrackPosition[]> = useRef([]);

  useEffect(() => {
    if (typeof value !== 'undefined' && typeof step !== 'undefined') {
      const targetValue = isRangeParams(props)
        ? [
            getValidValue(props.value[0], min, max, step),
            getValidValue(props.value[1], min, max, step),
          ]
        : getValidValue(props.value as number, min, max, step);
      onChange?.({
        value: targetValue as SliderValue<RANGE>,
      });
    }
  }, [range]);

  useEffect(() => {
    if (isRangeParams(props)) {
      props.value.forEach((val, index) => {
        activeButton.current = index === 0 ? 'left' : 'right';
        getNewValue(val, step);
      });
    } else if (typeof value === 'number') {
      activeButton.current = 'left';
      getNewValue(value, step);
    }
    activeButton.current = null;
  }, []);

  useEffect(() => {
    if (isRangeParams(props)) {
      if (props.value[0] > props.value[1]) {
        onChange?.({ value: [props.value[1], props.value[1]] as SliderValue<RANGE> });
      }
    }
  }, [value]);

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
      let changedValue: number;
      if (Array.isArray(value)) {
        changedValue = activeButton.current === 'left' ? value[0] : value[1];
      } else {
        changedValue = value as number;
      }
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
      if (validKeyCode) {
        const newValue = getNewValue(changedValue + stepIncrement, step);
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
    setTooltipPosition(analyzedValue);
    if (isRangeParams(props)) {
      return (activeButton.current === 'right'
        ? [props.value[0], analyzedValue]
        : [analyzedValue, props.value[1]]) as SliderValue<RANGE>;
    }
    return analyzedValue as SliderValue<RANGE>;
  };

  const setTooltipPosition = useCallback(
    (value: number) => {
      const button = buttonRefs[activeButton.current === 'left' ? 0 : 1].current;
      if (sliderRef.current && button) {
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

  const handleTouchEnd = useCallback<EventListener>(
    (event: Event) => {
      const position = changePosition(event);
      if (typeof position !== 'undefined') {
        onChange?.({ e: event, value: position });
      }
      stopListening();
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
        }
      }
    },
    [sliderRef, buttonRefs],
  );

  const handleTouchStart = useCallback(
    (nativeEvent: React.TouchEvent) => {
      if (!disabled) {
        handleDragStart(nativeEvent, 'touchmove', 'touchend');
      }
    },
    [handleDragStart],
  );

  const handleMouseDown = useCallback(
    (nativeEvent: React.MouseEvent) => {
      nativeEvent.preventDefault();
      handleDragStart(nativeEvent, 'mousemove', 'mouseup');
    },
    [handleDragStart],
  );

  const stopListening = useCallback(() => {
    const doc = sliderRef.current || document;
    doc.removeEventListener('mouseup', handleTouchEnd);
    doc.removeEventListener('touchend', handleTouchEnd);
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
  };
}

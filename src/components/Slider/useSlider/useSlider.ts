import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

import { useComponentSize } from '../../../hooks/useComponentSize/useComponentSize';
import { useFlag } from '../../../hooks/useFlag/useFlag';
import { SliderValue, TrackPosition } from '../helper';

import {
  ActiveButton,
  getActiveValue,
  getNewValue,
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
  const [leftPopover, setLeftPopover] = useState<TrackPosition>(null);
  const [rightPopover, setRightPopover] = useState<TrackPosition>(null);
  const [draggable, { on, off }] = useFlag(false);

  const activeButton: MutableRefObject<ActiveButton | null> = useRef(null);

  const sizeSlider = useComponentSize(sliderRef);

  const addListeners = () => {
    document.addEventListener('mouseup', handleTouchEnd);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('mousemove', handleTouchMove);
    document.addEventListener('touchmove', handleTouchMove);
  };

  const removeListeners = () => {
    document.removeEventListener('mouseup', handleTouchEnd);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('mousemove', handleTouchMove);
    document.removeEventListener('touchmove', handleTouchMove);
  };

  useEffect(() => {
    addListeners();
    return () => {
      removeListeners();
    };
  }, [
    activeButton.current,
    step,
    currentValue,
    value,
    min,
    max,
    sliderRef.current,
    buttonRefs,
    disabled,
    draggable,
  ]);

  useEffect(() => {
    if (Array.isArray(currentValue)) {
      setTooltipPosition(currentValue[0], 'left');
      setTooltipPosition(currentValue[1], 'right');
    } else {
      setTooltipPosition(currentValue, 'left');
    }
  }, [currentValue]);

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(currentValue)) {
      setCurrentValue(value);
      setTooltipPosition(getActiveValue(value, activeButton.current), 'left');
      activeButton.current = null;
    }
  }, [value]);

  useEffect(() => {
    onChange?.({
      value: Array.isArray(currentValue)
        ? ([
            getNewValue(currentValue[0], currentValue[0], step, min, max, 'left'),
            getNewValue(currentValue[1], currentValue[1], step, min, max, 'right'),
          ] as SliderValue<RANGE>)
        : (getNewValue(currentValue, currentValue, step, min, max, 'left') as SliderValue<RANGE>),
    });
  }, [step]);

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

  const onKeyPress = useCallback(
    (event: React.KeyboardEvent, typeButton: ActiveButton) => {
      if (!disabled && typeof typeButton === 'string' && typeof currentValue !== 'undefined') {
        let stepIncrement = !Array.isArray(step) ? step || 1 : 1;
        let validKeyCode = false;
        const changedValue = getActiveValue(currentValue, typeButton);
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
              if (typeof typeButton === 'string' && changedValue === stepPoint) {
                if (stepIncrement >= 0) {
                  if (index === 0) {
                    stepIncrement = stepsArr[1] - minValue;
                  } else {
                    stepIncrement =
                      (typeof stepsArr[index + 1] !== 'undefined'
                        ? stepsArr[index + 1]
                        : maxValue) - stepPoint;
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
          const newValue = getNewValue(
            changedValue + stepIncrement,
            currentValue,
            step,
            min,
            max,
            typeButton,
          );
          setCurrentValue(newValue);
          setTooltipPosition(getActiveValue(newValue, typeButton), typeButton);
          onChange?.({
            e: event,
            value: newValue as SliderValue<RANGE>,
          });
        }
      }
    },
    [currentValue, step, min, max],
  );

  const setTooltipPosition = (value: number, position: ActiveButton) => {
    if (sliderRef.current && position) {
      const button = buttonRefs[position === 'left' ? 0 : 1].current || sliderRef.current;
      const { x, width } = sliderRef.current.getBoundingClientRect();
      const newPosition = {
        y: button.offsetTop + button.offsetHeight + 50,
        x: x + Math.abs((value - minValue) / (maxValue - minValue)) * width,
      };
      if (position === 'left') {
        setLeftPopover(newPosition);
      } else {
        setRightPopover(newPosition);
      }
    }
  };

  const changePosition = (event: Event) => {
    const nativeEvent = event as MouseEvent | TouchEvent;
    if (typeof activeButton.current !== 'string') {
      return value;
    }
    const position = trackPosition(nativeEvent);
    const positionValue = getValueByPosition(position, sliderRef, minValue, maxValue);
    return getNewValue(positionValue, currentValue, step, min, max, activeButton.current);
  };

  const onFocus = (e: React.FocusEvent | React.MouseEvent, button: ActiveButton) => {
    activeButton.current = button;
  };

  const handleTouchMove = (event: MouseEvent | TouchEvent) => {
    if (typeof activeButton.current === 'string' && draggable) {
      const position = changePosition(event);
      const oldValue: number = getActiveValue(currentValue, activeButton.current);
      const newValue: number = getActiveValue(position, activeButton.current);
      if (oldValue !== newValue) {
        setCurrentValue(position);
        onAfterChange?.({ e: event, value: position as SliderValue<RANGE> });
      }
    }
  };

  const handleTouchEnd = (event: MouseEvent | TouchEvent) => {
    const position = changePosition(event);
    if (typeof position !== 'undefined') {
      setCurrentValue(position);
      onChange?.({ e: event, value: position as SliderValue<RANGE> });
    }
    off();
    if (JSON.stringify(position) !== JSON.stringify(currentValue)) {
      buttonRefs.forEach((button) => {
        button.current?.blur();
      });
      activeButton.current = null;
    }
  };

  useEffect(() => {
    if (isRangeParams(props)) {
      props.value.forEach((val, index) => {
        setTooltipPosition(
          getActiveValue(val, activeButton.current),
          index === 0 ? 'left' : 'right',
        );
      });
    }
    if (isNotRangeParams(props)) {
      setTooltipPosition(getActiveValue(value, activeButton.current), 'left');
    }
    activeButton.current = null;
  }, [sizeSlider, typeof value]);

  return {
    onKeyPress,
    onFocus,
    dragPoint: on,
    activeButton: activeButton.current,
    popoverPosition: [leftPopover, rightPopover],
    currentValue,
  };
}

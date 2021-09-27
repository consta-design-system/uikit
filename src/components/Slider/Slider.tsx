/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './Slider.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { cn } from '../../utils/bem';
import { Popover } from '../Popover/Popover';
import { Text } from '../Text/Text';

type PositionType = {
  x: number;
  y: number;
};

type SliderProps = {
  className?: string;
  step?: number | number[];
  min: number;
  max: number;
  disabled?: boolean;
  division?: boolean;
  withTooltip?: boolean;
  value?: number[] | number;
  onChange?: (
    event: Event | React.TouchEvent | React.MouseEvent,
    value: number,
    index: number,
  ) => void;
  onAfterChange?: (
    event: Event | React.TouchEvent | React.MouseEvent,
    value: number,
    index: number,
  ) => void;
  onChangeCommitted?: any;
  prefix?:
    | React.ReactNode
    | (({ value }: { value: number | number[] }) => React.ReactElement)
    | false;
  suffix?:
    | React.ReactNode
    | (({ value }: { value: number | number[] }) => React.ReactElement)
    | false;
};

export const cnSlider = cn('Slider');

export const sliderPropColor = ['default', 'dark', 'display'] as const;
export type sliderPropColor = typeof sliderPropColor[number];
export const sliderPropColorDefault: sliderPropColor = sliderPropColor[0];

export const sliderPropSize = ['m', 'xs', 's', 'l'] as const;
export type SliderPropSize = typeof sliderPropSize[number];
export const sliderPropSizeDefault: SliderPropSize = sliderPropSize[0];

const asc = (a: number, b: number) => {
  return a - b;
};

const ownerDocument = (node: Node | null | undefined): Document => {
  return (node && node.ownerDocument) || document;
};

const clamp = (value: number, min: number, max: number) => {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
};

const setValueIndex = (values: number[], source: number[], newValue: number, index: number) => {
  if (source[index] === newValue) {
    return source;
  }

  const output = values.slice();
  output[index] = newValue;
  return output;
};

const findClosest = (values: number[], currentValue: number) => {
  const { index: closestIndex } = values.reduce(
    (acc, value, index: number) => {
      const distance = Math.abs(currentValue - value);

      if (acc === null || distance < acc.distance || distance === acc.distance) {
        return {
          distance,
          index,
        };
      }

      return acc;
    },
    null as {
      distance: number;
      index: number;
    } | null,
  )!;
  return closestIndex;
};

const trackFinger = (event: any, touchId: any) => {
  if (touchId.current !== undefined && event.changedTouches) {
    for (let i = 0; i < event.changedTouches.length; i += 1) {
      const touch = event.changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }
    return null;
  }

  return {
    x: event.clientX,
    y: event.clientY,
  };
};

const percentToValue = (percent: any, min: any, max: any) => {
  return (max - min) * percent + min;
};

const getDecimalPrecision = (num: number) => {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
};

const roundValueToStep = (value: number, step: number | number[], min: number) => {
  if (!step) return value;
  if (typeof step === 'number') {
    const nearest = Math.round((value - min) / step) * step + min;
    return Number(nearest.toFixed(getDecimalPrecision(step)));
  }
  return [...step, 0].reduce(
    (acc, s) =>
      Math.abs(value - acc.length) < acc.distance
        ? { value: acc.length, distance: Math.abs(value - acc.length), length: acc.length + s }
        : { ...acc, length: acc.length + s },
    { value: min, distance: Infinity, length: min },
  ).value;
};

let cachedSupportsTouchActionNone: any;
const doesSupportTouchActionNone = () => {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
};

const getDividedValue = (step: number | number[], length: number) => {
  const stepData = (typeof step === 'number'
    ? Array.from({ length: length / (step || 1) }, () => step || 1)
    : step
  ).reduce(
    (acc, el) =>
      acc.sum + el > length
        ? { array: acc.array, sum: acc.sum }
        : { array: [...acc.array, el], sum: acc.sum + el },
    { array: [] as number[], sum: 0 },
  );
  if (stepData.sum < length) return [...stepData.array, length - stepData.sum];
  return stepData.array;
};

const checkFill = (path: number, value: number | number[], min: number) => {
  if (!Array.isArray(value)) return path < value - min;
  return path >= value[0] - min && path < value[1] - min;
};

const getPercent = (value: number, min: number, max: number) =>
  Math.max(Math.min((value / (max - min)) * 100, 100), 0);

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      step = 1,
      min,
      max,
      value,
      onChange,
      onAfterChange,
      disabled,
      withTooltip,
      division,
      onChangeCommitted,
      prefix,
      suffix,
    },
    ref,
  ) => {
    const minValue = max > min ? min : 0;
    const maxValue = max > min ? max : 100;

    const [dragging, setDragging] = useState<boolean>(false);
    const [isActiveOne, setIsActiveOne] = useState<boolean>(false);
    const [isActiveTwo, setIsActiveTwo] = useState<boolean>(false);
    const [valueDerived, setValueState] = useState<number | number[]>(value || 0);
    const [popoverPosition, setPopoverPosition] = useState<{ x: number; y: number }>({
      x: 0,
      y: 0,
    });

    const [dividedValue, setDividedValue] = useState(getDividedValue(step, maxValue - minValue));

    const range = useRef(Array.isArray(valueDerived));
    const values = useRef<number | number[]>(0);
    const valueDerivedRef = useRef<number | number[]>(valueDerived);
    values.current = range.current
      ? (valueDerived as number[]).slice().sort(asc)
      : [valueDerived as number];
    valueDerivedRef.current = valueDerived;

    const localStep = useRef(step || 1);
    const pointValueOne = useRef<HTMLButtonElement | null>(null);
    const pointValueTwo = useRef<HTMLButtonElement | null>(null);

    const moveCount = React.useRef(0);
    const sliderRef = React.useRef<HTMLDivElement>(null);
    const touchId = React.useRef<number>();

    const previousIndex = React.useRef();

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
        let activeIndex: any = 0;

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
      (nativeEvent) => {
        const finger = trackFinger(nativeEvent, touchId);

        if (!finger) {
          return;
        }

        moveCount.current += 1;

        if ('buttons' in nativeEvent && (nativeEvent as MouseEvent).buttons === 0) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          handleTouchEnd(nativeEvent);
          return;
        }

        const { newValue, activeIndex } = getFingerNewValue(finger, true, valueDerivedRef.current)!;

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
            ? newValue[0] !== valueDerivedRef.current[0] ||
              newValue[1] !== valueDerivedRef.current[1]
            : newValue !== valueDerivedRef.current
        ) {
          setValueState(newValue);

          if (onChangeCommitted) {
            onChangeCommitted(nativeEvent, newValue);
          }

          const rect = (activeIndex || !range.current
            ? pointValueTwo
            : pointValueOne
          ).current!.getBoundingClientRect();
          setPopoverPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        }
      },
      [getFingerNewValue],
    );

    const handleTouchEnd = useCallback<EventListener>(
      (nativeEvent) => {
        const finger = trackFinger(nativeEvent, touchId);
        setDragging(false);

        if (!finger) return;

        const { newValue, activeIndex } = getFingerNewValue(finger, true, valueDerivedRef.current)!;

        if (onChangeCommitted) {
          onChangeCommitted(nativeEvent, newValue);
        }
        setIsActiveOne(false);
        setIsActiveTwo(false);

        onAfterChange?.(
          nativeEvent,
          Array.isArray(newValue) ? newValue[activeIndex] : newValue,
          activeIndex,
        );

        touchId.current = undefined;
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
        const finger = trackFinger(nativeEvent, touchId);

        if (!finger) return;

        const { newValue, activeIndex } = getFingerNewValue(
          finger,
          false,
          valueDerivedRef.current,
        )!;

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
        ).current!.getBoundingClientRect();
        setPopoverPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      },
      [getFingerNewValue],
    );

    const handleMouseDown = useCallback(
      (nativeEvent: React.MouseEvent) => {
        if (nativeEvent.button !== 0) return;

        nativeEvent.preventDefault();
        const finger = trackFinger(nativeEvent, touchId);

        if (!finger) return;

        const { newValue, activeIndex } = getFingerNewValue(
          finger,
          false,
          valueDerivedRef.current,
        )!;

        setValueState(newValue);

        onChange?.(
          nativeEvent,
          Array.isArray(newValue) ? newValue[activeIndex] : newValue,
          activeIndex,
        );

        moveCount.current = 0;
        const doc = ownerDocument(sliderRef.current);
        doc.addEventListener('mousemove', handleTouchMove);
        doc.addEventListener('mouseup', handleTouchEnd);

        const rect = (activeIndex || !range.current
          ? pointValueTwo
          : pointValueOne
        ).current!.getBoundingClientRect();
        setPopoverPosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      },
      [getFingerNewValue],
    );

    const stopListening = useCallback(() => {
      const doc = ownerDocument(sliderRef.current);
      doc.removeEventListener('mousemove', handleTouchMove);
      doc.removeEventListener('mouseup', handleTouchEnd);
      doc.removeEventListener('touchmove', handleTouchMove);
      doc.removeEventListener('touchend', handleTouchEnd);
    }, [handleTouchEnd, handleTouchMove]);

    useEffect(() => {
      return () => {
        if (isActiveOne || isActiveTwo) stopListening();
      };
    }, [minValue, maxValue, isActiveOne, isActiveTwo]);

    React.useEffect(() => {
      if (disabled) {
        stopListening();
      }
    }, [disabled, stopListening]);

    useEffect(() => {
      localStep.current = Array.isArray(step)
        ? getDividedValue(step, maxValue - minValue)
        : step || 1;
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

    return (
      <div className={cnSlider({ disabled }, [className])} ref={ref}>
        {prefix && (
          <div className={cnSlider('prefix', { disabled })}>
            {typeof prefix === 'function' ? prefix({ value: valueDerived }) : prefix}
          </div>
        )}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          ref={sliderRef}
          className={cnSlider('input', { division: division && !!step })}
        >
          {division && !!step && (
            <div className={cnSlider('input-divided', { disabled })}>
              {dividedValue?.map((item: number, index: number) => (
                <div
                  key={index}
                  className={cnSlider('input-divide', {
                    fill: checkFill(
                      dividedValue?.reduce(
                        (acc, item, i) => (i <= index - 1 ? acc + item : acc),
                        0,
                      ),
                      valueDerived,
                      minValue,
                    ),
                    disabled,
                    active: isActiveOne || isActiveTwo,
                  })}
                  style={{
                    width: `${Math.min(getPercent(item, minValue, maxValue))}%`,
                  }}
                />
              ))}
            </div>
          )}
          {(!division || !step) && (
            <div
              className={cnSlider('fill', { isActive: isActiveOne || isActiveTwo, disabled })}
              style={{
                width: `${getPercent(
                  Array.isArray(valueDerived)
                    ? valueDerived[1] - valueDerived[0]
                    : valueDerived - minValue,
                  minValue,
                  maxValue,
                )}%`,
                marginLeft: `${Math.min(
                  Array.isArray(valueDerived)
                    ? getPercent(valueDerived[0] - minValue, minValue, maxValue)
                    : 0,
                )}%`,
              }}
            />
          )}
          {range.current && (
            <>
              <button
                onMouseDown={() => setIsActiveOne(true)}
                onTouchStart={() => setIsActiveOne(true)}
                className={cnSlider('point', { isActive: isActiveOne || isActiveTwo, disabled })}
                ref={pointValueOne}
                style={{
                  left: `${getPercent(
                    (Array.isArray(valueDerived) ? valueDerived[0] : valueDerived) - minValue,
                    minValue,
                    maxValue,
                  )}%`,
                }}
              />
              {withTooltip && isActiveOne && (
                <Popover
                  direction="downCenter"
                  spareDirection="upCenter"
                  offset={18}
                  position={popoverPosition}
                >
                  <div className={cnSlider('tooltip')}>
                    <Text size="xs">
                      {Math.round(Array.isArray(valueDerived) ? valueDerived[0] : valueDerived)}
                    </Text>
                  </div>
                </Popover>
              )}
            </>
          )}
          <button
            onMouseDown={() => setIsActiveTwo(true)}
            onTouchStart={() => setIsActiveTwo(true)}
            className={cnSlider('point', { isActive: isActiveOne || isActiveTwo, disabled })}
            ref={pointValueTwo}
            style={{
              left: `${getPercent(
                (Array.isArray(valueDerived) ? valueDerived[1] : valueDerived) - minValue,
                minValue,
                maxValue,
              )}%`,
            }}
          />
          {withTooltip && isActiveTwo && (
            <Popover
              direction="downCenter"
              spareDirection="upCenter"
              offset={18}
              position={popoverPosition}
            >
              <div className={cnSlider('tooltip')}>
                <Text size="xs">
                  {Math.round(Array.isArray(valueDerived) ? valueDerived[1] : valueDerived)}
                </Text>
              </div>
            </Popover>
          )}
        </div>
        {suffix && (
          <div className={cnSlider('suffix', { disabled })}>
            {typeof suffix === 'function' ? suffix({ value: valueDerived }) : suffix}
          </div>
        )}
      </div>
    );
  },
);

import React, { RefObject } from 'react';

export const asc = (a: number, b: number) => {
  return a - b;
};

export const ownerDocument = (node: Node | null | undefined): Document => {
  return (node && node.ownerDocument) || document;
};

export const clamp = (value: number, min: number, max: number) => {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
};

export const setValueIndex = (
  values: number[],
  source: number[],
  newValue: number,
  index: number,
) => {
  if (source[index] === newValue) {
    return source;
  }

  const output = values.slice();
  output[index] = newValue;
  return output;
};

export const findClosest = (values: number[], currentValue: number) => {
  const { index: closestIndex } = values.reduce(
    (acc, value, index: number) => {
      const distance = Math.abs(currentValue - value);

      if (distance <= acc.distance) {
        return {
          distance,
          index,
        };
      }

      return acc;
    },
    {
      distance: Infinity,
      index: 0,
    },
  );
  return closestIndex;
};

export const trackFinger = (
  event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
  touchId: RefObject<number>,
) => {
  if (touchId.current !== undefined && 'changedTouches' in event) {
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
  if ('clientX' in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
  return null;
};

export const percentToValue = (percent: number, min: number, max: number) => {
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

export const roundValueToStep = (value: number, step: number | number[], min: number) => {
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

let cachedSupportsTouchActionNone: boolean;

export const doesSupportTouchActionNone = () => {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
};

export const getDividedValue = (step: number | number[] | undefined, length: number) => {
  if (!step) return [length];

  const stepData = (typeof step === 'number'
    ? Array.from({ length: length / step }, () => step)
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

export const checkFill = (path: number, value: number | number[], min: number) => {
  if (!Array.isArray(value)) return path < value - min;
  return path >= value[0] - min && path < value[1] - min;
};

export const getPercent = (value: number, min: number, max: number) =>
  Math.max(Math.min((value / (max - min)) * 100, 100), 0);

export const getNearestValue = (number: number, array: number[]) => {
  let current = array[0];
  let difference = Math.abs(number - current);
  let index = array.length;

  while (index--) {
    const newDifference = Math.abs(number - array[index]);
    if (newDifference < difference) {
      difference = newDifference;
      current = array[index];
    }
  }
  return current;
};

import { IconPropSize } from '@consta/icons/Icon';
import React from 'react';

import { TextFieldPropSize } from './types';

export const sizeMap: Record<TextFieldPropSize, IconPropSize> = {
  xs: 'xs',
  s: 's',
  m: 's',
  l: 'm',
};

export const getValueByStepArray = (
  steps: number[],
  value: string | null | undefined,
  min: number | string | undefined,
  max: number | string | undefined,
  isIncrement: boolean,
): number => {
  const currentValue = Number(value ?? min);
  const minValue = Number(min);
  if (typeof value !== 'string') {
    return typeof min !== 'undefined' ? minValue : 0;
  }
  if (currentValue < steps[0]) {
    return steps[0];
  }
  if (currentValue > steps[steps.length - 1]) {
    return steps[steps.length - 1];
  }
  if (
    (!isIncrement && currentValue === steps[0]) ||
    (isIncrement && currentValue === steps[steps.length - 1])
  ) {
    return currentValue;
  }
  for (let i = 0; i < steps.length; i++) {
    if (
      currentValue === steps[i] ||
      (steps[i] < currentValue && steps[i + 1] > currentValue)
    ) {
      return steps[i + (isIncrement ? 1 : -1)];
    }
  }
  return 0;
};

export const getValueByStepNumber = (
  step: number | string,
  value: string | null | undefined,
  min: number | string | undefined,
  max: number | string | undefined,
  isIncrement: boolean,
): number => {
  const minValue = Number(min);
  const maxValue = Number(max);
  const currentValue: number =
    (typeof value === 'string' ? Number(value) : 0) +
    Number(step) * (isIncrement ? 1 : -1);
  if (!Number.isNaN(minValue) && currentValue <= minValue) {
    return minValue;
  }
  if (!Number.isNaN(maxValue) && currentValue >= maxValue) {
    return maxValue;
  }
  return Number(
    currentValue.toFixed(
      Number(
        /* Необходимо для того, чтобы избежать ситуации, когда по нажатию
на кнопку прибавляется число с погрешностью.
Здесь мы берем разрядность дробной части шага и ограничиваем
результирующее число этой разрядностью */
        Number(step).toString().split('.')[1]?.length,
      ) || 0,
    ),
  );
};

export const getIncrementFlag = (
  event: React.KeyboardEvent,
): boolean | null => {
  if (event?.key !== 'ArrowUp' && event?.key !== 'ArrowDown') {
    return null;
  }
  return event?.key === 'ArrowUp';
};

export const getTypeForRender = (type: string, passwordVible: boolean) => {
  if (type !== 'password') {
    return type;
  }
  if (passwordVible) {
    return 'text';
  }
  return 'password';
};

export const getValueByStep = (
  steps: number | number[],
  value: string | null | undefined,
  isIncrement: boolean,
  min?: number | string,
  max?: number | string,
) => {
  return (
    Array.isArray(steps)
      ? getValueByStepArray(steps, value, min, max, isIncrement)
      : getValueByStepNumber(steps, value, min, max, isIncrement)
  ).toString();
};

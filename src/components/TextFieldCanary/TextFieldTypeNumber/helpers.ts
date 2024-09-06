export const getValueByStepArray = (
  steps: number[],
  value: string | null | undefined,
  isIncrement: boolean,
): number => {
  const currentValue = Number(value ?? steps[0]);

  if (currentValue < steps[0]) {
    return steps[0];
  }

  if (currentValue > steps[steps.length - 1]) {
    return steps[steps.length - 1];
  }

  for (let i = 0; i < steps.length; i++) {
    if (
      isIncrement &&
      (currentValue === steps[i] ||
        (steps[i] < currentValue && steps[i + 1] > currentValue))
    ) {
      return steps[i + 1];
    }
    if (
      !isIncrement &&
      (currentValue === steps[i] ||
        (steps[i - 1] < currentValue && steps[i] > currentValue))
    ) {
      return steps[i - 1];
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

export const getValueByStep = (
  steps: number | number[],
  value: string | null | undefined,
  isIncrement: boolean,
  min?: number | string,
  max?: number | string,
) => {
  return (
    Array.isArray(steps)
      ? getValueByStepArray(steps, value, isIncrement)
      : getValueByStepNumber(steps, value, min, max, isIncrement)
  ).toString();
};

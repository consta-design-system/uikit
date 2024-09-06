import { useMemo } from 'react';

import { isDefined, isNumber } from '##/utils/type-guards';

type Props = {
  step?: string | number | number[];
  min?: string | number;
  max?: string | number;
};

const getIsValidValue = (value: number, min?: number, max?: number) =>
  !((isNumber(min) && value < min) || (isNumber(max) && value > max));

const guardStep = <T extends string | number | undefined>(step: T) =>
  (isDefined(step) ? Number(step) : step) as Exclude<T, string>;

export const useSortSteps = (props: Props) => {
  const { step = 1, min: minProp, max: maxProp } = props;
  const min = guardStep(minProp);
  const max = guardStep(maxProp);

  const sortedSteps = useMemo(() => {
    if (Array.isArray(step)) {
      const stepsArr = [...step];
      if (typeof min === 'number') {
        stepsArr.push(min);
      }
      if (typeof max === 'number') {
        stepsArr.push(max);
      }
      const sortedArray = stepsArr
        .sort((a, b) => a - b)
        .filter((val) => getIsValidValue(val, min, max));
      return Array.from(new Set(sortedArray));
    }
    return guardStep(step);
  }, [Array.isArray(step) ? step.join('-') : step, min, max]);

  return sortedSteps;
};

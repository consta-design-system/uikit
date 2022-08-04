import { useMemo } from 'react';

type Props = {
  step?: string | number | number[];
  min?: number;
  max?: number;
};

const getIsValidValue = (value: number, min?: number, max?: number) => {
  return !(
    (typeof min === 'number' && value < min) ||
    (typeof max === 'number' && value > max)
  );
};

export const useSortSteps = (props: Props): number | number[] => {
  const { step, min, max } = props;

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
    return Number(step);
  }, [step, min, max]);

  return sortedSteps;
};

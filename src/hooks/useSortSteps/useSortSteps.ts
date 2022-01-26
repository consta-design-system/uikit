import { useMemo } from 'react';

type Props = {
  step?: string | number | number[];
  min?: number;
  max?: number;
};

export const useSortSteps = (props: Props): number | number[] => {
  const { step, min, max } = props;

  const sortedSteps = useMemo(() => {
    if (Array.isArray(step)) {
      const stepsArr = [...step].sort((a, b) => a - b);
      if (typeof min === 'number' && stepsArr[0] !== min) {
        stepsArr.unshift(min);
      }
      if (typeof max === 'number' && stepsArr[stepsArr.length - 1] !== max) {
        stepsArr.push(max);
      }
      return stepsArr;
    }
    return Number(step);
  }, [step, min, max]);

  return sortedSteps;
};

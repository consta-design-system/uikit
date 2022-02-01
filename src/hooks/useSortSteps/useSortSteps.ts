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
      const stepsArr = [...step];
      if (typeof min === 'number' && stepsArr[0] !== min) {
        stepsArr.unshift(min);
      }
      if (typeof max === 'number' && stepsArr[stepsArr.length - 1] !== max) {
        stepsArr.push(max);
      }
      const sortedArray = stepsArr.sort((a, b) => a - b);
      const minValue = typeof min === 'number' ? min : stepsArr[0];
      const maxValue = typeof max === 'number' ? max : stepsArr[stepsArr.length - 1];
      return sortedArray.filter((val) => !(val < minValue || val > maxValue));
    }
    return Number(step);
  }, [step, min, max]);

  return sortedSteps;
};

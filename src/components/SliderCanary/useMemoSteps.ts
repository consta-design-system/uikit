import { useEffect, useState } from 'react';

type Props = {
  step: number | number[];
  min: number;
  max: number;
};

export const useMemoSteps = (props: Props): number | number[] => {
  const { step, min, max } = props;

  const [sortedSteps, setSortedSteps] = useState<number | number[]>(step);

  useEffect(() => {
    if (Array.isArray(step)) {
      const stepsArr = [...step].sort((a, b) => a - b);
      if (stepsArr[0] !== min) {
        stepsArr.unshift(min);
      }
      if (stepsArr[stepsArr.length - 1] !== max) {
        stepsArr.push(max);
      }
      setSortedSteps(stepsArr);
    } else {
      setSortedSteps(step);
    }
  }, [step, min, max]);

  return sortedSteps;
};

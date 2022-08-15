import { useEffect, useMemo, useState } from 'react';

import { DateRange } from '../../../utils/types/Date';
import { isDateInRange } from './isDateInRange';

type GetCurrentVisibleDateProps = {
  currentVisibleDate: Date | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  value: Date | DateRange | undefined | null;
  startOfUnit: (date: Date) => Date;
  onChangeCurrentVisibleDate?: (date: Date) => void;
};

export type UseCurrentVisibleDateProps = GetCurrentVisibleDateProps & {
  onChangeCurrentVisibleDate?: (date: Date) => void;
};

const calculateCurrentVisibleDate = ({
  currentVisibleDate,
  minDate,
  maxDate,
  value,
}: GetCurrentVisibleDateProps): Date => {
  if (currentVisibleDate) {
    return currentVisibleDate;
  }

  if (Array.isArray(value) && value[0]) {
    return value[0];
  }

  if (Array.isArray(value) && value[1]) {
    return value[1];
  }

  if (value && !Array.isArray(value)) {
    return value;
  }

  const currentDate = new Date();

  if (minDate && maxDate && !isDateInRange(currentDate, [minDate, maxDate])) {
    return minDate;
  }

  if (minDate && !maxDate) {
    const minDateTime = minDate.getTime();
    const currentDateTime = currentDate.getTime();
    if (currentDateTime < minDateTime) {
      return minDate;
    }
  }

  if (!minDate && maxDate) {
    const maxDateTime = maxDate.getTime();
    const currentDateTime = currentDate.getTime();
    if (currentDateTime > maxDateTime) {
      return maxDate;
    }
  }

  return currentDate;
};

export const getCurrentVisibleDate = (
  props: GetCurrentVisibleDateProps,
): Date => props.startOfUnit(calculateCurrentVisibleDate(props));

export const useCurrentVisibleDate = (props: UseCurrentVisibleDateProps) => {
  const currentVisibleDate = useMemo(() => {
    return getCurrentVisibleDate(props);
  }, [
    props.currentVisibleDate?.getTime() || 0,
    props.minDate?.getTime() || 0,
    props.maxDate?.getTime() || 0,
  ]);

  const state = useState<Date>(currentVisibleDate);

  useEffect(() => state[1](currentVisibleDate), [currentVisibleDate.getTime()]);

  useEffect(
    () => state[0] && props.onChangeCurrentVisibleDate?.(state[0]),
    [state[0]?.getTime()],
  );

  return state;
};

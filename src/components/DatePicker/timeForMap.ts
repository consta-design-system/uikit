import { isNumber } from '##/utils/type-guards';

export const timeForMap: Record<0 | 1, 'start' | 'end'> = {
  0: 'start',
  1: 'end',
};

export const getTimeFof = (focusedFieldIndex: 0 | 1 | undefined) => {
  if (isNumber(focusedFieldIndex)) {
    return timeForMap[focusedFieldIndex];
  }
};

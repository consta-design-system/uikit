import { startOfYear } from 'date-fns';

import { isEqualDate } from '../../../utils/date';

export const isEqualYear = (date1: Date, date2: Date) =>
  isEqualDate(startOfYear(date1), startOfYear(date2));

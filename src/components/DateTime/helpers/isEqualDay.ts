import { startOfDay } from 'date-fns';

import { isEqualDate } from '../../../utils/date';

export const isEqualDay = (date1: Date, date2: Date): boolean =>
  isEqualDate(startOfDay(date1), startOfDay(date2));

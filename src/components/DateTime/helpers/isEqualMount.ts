import { startOfMonth } from 'date-fns';

import { isEqualDate } from '../../../utils/date';

export const isEqualMount = (date1: Date, date2: Date) =>
  isEqualDate(startOfMonth(date1), startOfMonth(date2));

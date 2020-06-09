import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCalendarSizeM from './IconCalendar_size_m';
import IconCalendarSizeS from './IconCalendar_size_s';
import IconCalendarSizeXs from './IconCalendar_size_xs';

export const IconCalendar = BaseIconHoc({
  m: IconCalendarSizeM,
  s: IconCalendarSizeS,
  xs: IconCalendarSizeXs,
  name: 'IconCalendar',
})(Icon);

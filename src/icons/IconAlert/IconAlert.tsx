import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAlertSizeM from './IconAlert_size_m';
import IconAlertSizeS from './IconAlert_size_s';
import IconAlertSizeXs from './IconAlert_size_xs';

export const IconAlert = BaseIconHoc({
  m: IconAlertSizeM,
  s: IconAlertSizeS,
  xs: IconAlertSizeXs,
  name: 'IconAlert',
})(Icon);

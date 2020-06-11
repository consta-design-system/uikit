import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconLockSizeM from './IconLock_size_m';
import IconLockSizeS from './IconLock_size_s';
import IconLockSizeXs from './IconLock_size_xs';

export const IconLock = BaseIconHoc({
  m: IconLockSizeM,
  s: IconLockSizeS,
  xs: IconLockSizeXs,
  name: 'IconLock',
})(Icon);

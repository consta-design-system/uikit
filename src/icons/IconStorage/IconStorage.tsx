import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconStorageSizeM from './IconStorage_size_m';
import IconStorageSizeS from './IconStorage_size_s';
import IconStorageSizeXs from './IconStorage_size_xs';

export const IconStorage = BaseIconHoc({
  m: IconStorageSizeM,
  s: IconStorageSizeS,
  xs: IconStorageSizeXs,
  name: 'IconStorage',
})(Icon);

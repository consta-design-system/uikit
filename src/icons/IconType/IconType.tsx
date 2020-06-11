import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconTypeSizeM from './IconType_size_m';
import IconTypeSizeS from './IconType_size_s';
import IconTypeSizeXs from './IconType_size_xs';

export const IconType = BaseIconHoc({
  m: IconTypeSizeM,
  s: IconTypeSizeS,
  xs: IconTypeSizeXs,
  name: 'IconType',
})(Icon);

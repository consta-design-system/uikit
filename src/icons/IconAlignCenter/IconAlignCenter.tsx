import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAlignCenterSizeM from './IconAlignCenter_size_m';
import IconAlignCenterSizeS from './IconAlignCenter_size_s';
import IconAlignCenterSizeXs from './IconAlignCenter_size_xs';

export const IconAlignCenter = BaseIconHoc({
  m: IconAlignCenterSizeM,
  s: IconAlignCenterSizeS,
  xs: IconAlignCenterSizeXs,
  name: 'IconAlignCenter',
})(Icon);

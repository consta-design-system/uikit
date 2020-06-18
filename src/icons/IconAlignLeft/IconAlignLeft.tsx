import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAlignLeftSizeM from './IconAlignLeft_size_m';
import IconAlignLeftSizeS from './IconAlignLeft_size_s';
import IconAlignLeftSizeXs from './IconAlignLeft_size_xs';

export const IconAlignLeft = BaseIconHoc({
  m: IconAlignLeftSizeM,
  s: IconAlignLeftSizeS,
  xs: IconAlignLeftSizeXs,
  name: 'IconAlignLeft',
})(Icon);

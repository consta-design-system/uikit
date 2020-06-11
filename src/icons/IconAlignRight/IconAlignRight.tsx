import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAlignRightSizeM from './IconAlignRight_size_m';
import IconAlignRightSizeS from './IconAlignRight_size_s';
import IconAlignRightSizeXs from './IconAlignRight_size_xs';

export const IconAlignRight = BaseIconHoc({
  m: IconAlignRightSizeM,
  s: IconAlignRightSizeS,
  xs: IconAlignRightSizeXs,
  name: 'IconAlignRight',
})(Icon);

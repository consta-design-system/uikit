import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDiamondSizeM from './IconDiamond_size_m';
import IconDiamondSizeS from './IconDiamond_size_s';
import IconDiamondSizeXs from './IconDiamond_size_xs';

export const IconDiamond = BaseIconHoc({
  m: IconDiamondSizeM,
  s: IconDiamondSizeS,
  xs: IconDiamondSizeXs,
  name: 'IconDiamond',
})(Icon);

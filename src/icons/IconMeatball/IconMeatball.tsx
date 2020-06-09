import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconMeatballSizeM from './IconMeatball_size_m';
import IconMeatballSizeS from './IconMeatball_size_s';
import IconMeatballSizeXs from './IconMeatball_size_xs';

export const IconMeatball = BaseIconHoc({
  m: IconMeatballSizeM,
  s: IconMeatballSizeS,
  xs: IconMeatballSizeXs,
  name: 'IconMeatball',
})(Icon);

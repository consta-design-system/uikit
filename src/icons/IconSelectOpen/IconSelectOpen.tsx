import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSelectOpenSizeM from './IconSelectOpen_size_m';
import IconSelectOpenSizeS from './IconSelectOpen_size_s';
import IconSelectOpenSizeXs from './IconSelectOpen_size_xs';

export const IconSelectOpen = BaseIconHoc({
  m: IconSelectOpenSizeM,
  s: IconSelectOpenSizeS,
  xs: IconSelectOpenSizeXs,
  name: 'IconSelectOpen',
})(Icon);

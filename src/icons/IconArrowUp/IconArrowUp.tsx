import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconArrowUpSizeM from './IconArrowUp_size_m';
import IconArrowUpSizeS from './IconArrowUp_size_s';
import IconArrowUpSizeXs from './IconArrowUp_size_xs';

export const IconArrowUp = BaseIconHoc({
  m: IconArrowUpSizeM,
  s: IconArrowUpSizeS,
  xs: IconArrowUpSizeXs,
  name: 'IconArrowUp',
})(Icon);

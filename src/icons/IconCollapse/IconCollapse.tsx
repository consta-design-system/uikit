import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCollapseSizeM from './IconCollapse_size_m';
import IconCollapseSizeS from './IconCollapse_size_s';
import IconCollapseSizeXs from './IconCollapse_size_xs';

export const IconCollapse = BaseIconHoc({
  m: IconCollapseSizeM,
  s: IconCollapseSizeS,
  xs: IconCollapseSizeXs,
  name: 'IconCollapse',
})(Icon);

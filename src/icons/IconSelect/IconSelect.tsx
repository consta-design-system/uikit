import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSelectSizeM from './IconSelect_size_m';
import IconSelectSizeS from './IconSelect_size_s';
import IconSelectSizeXs from './IconSelect_size_xs';

export const IconSelect = BaseIconHoc({
  m: IconSelectSizeM,
  s: IconSelectSizeS,
  xs: IconSelectSizeXs,
  name: 'IconSelect',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconKebabSizeM from './IconKebab_size_m';
import IconKebabSizeS from './IconKebab_size_s';
import IconKebabSizeXs from './IconKebab_size_xs';

export const IconKebab = BaseIconHoc({
  m: IconKebabSizeM,
  s: IconKebabSizeS,
  xs: IconKebabSizeXs,
  name: 'IconKebab',
})(Icon);

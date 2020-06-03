import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconColorFillSizeM from './IconColorFill_size_m';
import IconColorFillSizeS from './IconColorFill_size_s';
import IconColorFillSizeXs from './IconColorFill_size_xs';

export const IconColorFill = BaseIconHoc({
  m: IconColorFillSizeM,
  s: IconColorFillSizeS,
  xs: IconColorFillSizeXs,
  name: 'IconColorFill',
})(Icon);

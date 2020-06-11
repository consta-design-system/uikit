import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconRoubleSizeM from './IconRouble_size_m';
import IconRoubleSizeS from './IconRouble_size_s';
import IconRoubleSizeXs from './IconRouble_size_xs';

export const IconRouble = BaseIconHoc({
  m: IconRoubleSizeM,
  s: IconRoubleSizeS,
  xs: IconRoubleSizeXs,
  name: 'IconRouble',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCheckSizeM from './IconCheck_size_m';
import IconCheckSizeS from './IconCheck_size_s';
import IconCheckSizeXs from './IconCheck_size_xs';

export const IconCheck = BaseIconHoc({
  m: IconCheckSizeM,
  s: IconCheckSizeS,
  xs: IconCheckSizeXs,
  name: 'IconCheck',
})(Icon);

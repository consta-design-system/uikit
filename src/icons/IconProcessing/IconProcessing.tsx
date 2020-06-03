import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconProcessingSizeM from './IconProcessing_size_m';
import IconProcessingSizeS from './IconProcessing_size_s';
import IconProcessingSizeXs from './IconProcessing_size_xs';

export const IconProcessing = BaseIconHoc({
  m: IconProcessingSizeM,
  s: IconProcessingSizeS,
  xs: IconProcessingSizeXs,
  name: 'IconProcessing',
})(Icon);

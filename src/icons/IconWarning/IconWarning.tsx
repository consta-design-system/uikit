import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconWarningSizeM from './IconWarning_size_m';
import IconWarningSizeS from './IconWarning_size_s';
import IconWarningSizeXs from './IconWarning_size_xs';

export const IconWarning = BaseIconHoc({
  m: IconWarningSizeM,
  s: IconWarningSizeS,
  xs: IconWarningSizeXs,
  name: 'IconWarning',
})(Icon);

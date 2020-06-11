import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCrownSizeM from './IconCrown_size_m';
import IconCrownSizeS from './IconCrown_size_s';
import IconCrownSizeXs from './IconCrown_size_xs';

export const IconCrown = BaseIconHoc({
  m: IconCrownSizeM,
  s: IconCrownSizeS,
  xs: IconCrownSizeXs,
  name: 'IconCrown',
})(Icon);

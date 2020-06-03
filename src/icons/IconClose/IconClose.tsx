import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCloseSizeM from './IconClose_size_m';
import IconCloseSizeS from './IconClose_size_s';
import IconCloseSizeXs from './IconClose_size_xs';

export const IconClose = BaseIconHoc({
  m: IconCloseSizeM,
  s: IconCloseSizeS,
  xs: IconCloseSizeXs,
  name: 'IconClose',
})(Icon);

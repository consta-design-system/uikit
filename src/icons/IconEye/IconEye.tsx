import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconEyeSizeM from './IconEye_size_m';
import IconEyeSizeS from './IconEye_size_s';
import IconEyeSizeXs from './IconEye_size_xs';

export const IconEye = BaseIconHoc({
  m: IconEyeSizeM,
  s: IconEyeSizeS,
  xs: IconEyeSizeXs,
  name: 'IconEye',
})(Icon);

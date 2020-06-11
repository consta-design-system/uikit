import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconTopSizeM from './IconTop_size_m';
import IconTopSizeS from './IconTop_size_s';
import IconTopSizeXs from './IconTop_size_xs';

export const IconTop = BaseIconHoc({
  m: IconTopSizeM,
  s: IconTopSizeS,
  xs: IconTopSizeXs,
  name: 'IconTop',
})(Icon);

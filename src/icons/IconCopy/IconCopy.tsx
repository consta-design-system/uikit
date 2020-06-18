import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCopySizeM from './IconCopy_size_m';
import IconCopySizeS from './IconCopy_size_s';
import IconCopySizeXs from './IconCopy_size_xs';

export const IconCopy = BaseIconHoc({
  m: IconCopySizeM,
  s: IconCopySizeS,
  xs: IconCopySizeXs,
  name: 'IconCopy',
})(Icon);

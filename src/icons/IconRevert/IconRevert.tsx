import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconRevertSizeM from './IconRevert_size_m';
import IconRevertSizeS from './IconRevert_size_s';
import IconRevertSizeXs from './IconRevert_size_xs';

export const IconRevert = BaseIconHoc({
  m: IconRevertSizeM,
  s: IconRevertSizeS,
  xs: IconRevertSizeXs,
  name: 'IconRevert',
})(Icon);

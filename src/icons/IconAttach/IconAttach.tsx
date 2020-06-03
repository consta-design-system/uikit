import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAttachSizeM from './IconAttach_size_m';
import IconAttachSizeS from './IconAttach_size_s';
import IconAttachSizeXs from './IconAttach_size_xs';

export const IconAttach = BaseIconHoc({
  m: IconAttachSizeM,
  s: IconAttachSizeS,
  xs: IconAttachSizeXs,
  name: 'IconAttach',
})(Icon);

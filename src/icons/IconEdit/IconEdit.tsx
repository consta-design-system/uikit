import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconEditSizeM from './IconEdit_size_m';
import IconEditSizeS from './IconEdit_size_s';
import IconEditSizeXs from './IconEdit_size_xs';

export const IconEdit = BaseIconHoc({
  m: IconEditSizeM,
  s: IconEditSizeS,
  xs: IconEditSizeXs,
  name: 'IconEdit',
})(Icon);

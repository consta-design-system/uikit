import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDropSizeM from './IconDrop_size_m';
import IconDropSizeS from './IconDrop_size_s';
import IconDropSizeXs from './IconDrop_size_xs';

export const IconDrop = BaseIconHoc({
  m: IconDropSizeM,
  s: IconDropSizeS,
  xs: IconDropSizeXs,
  name: 'IconDrop',
})(Icon);

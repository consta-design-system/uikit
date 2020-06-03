import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSortUpSizeM from './IconSortUp_size_m';
import IconSortUpSizeS from './IconSortUp_size_s';
import IconSortUpSizeXs from './IconSortUp_size_xs';

export const IconSortUp = BaseIconHoc({
  m: IconSortUpSizeM,
  s: IconSortUpSizeS,
  xs: IconSortUpSizeXs,
  name: 'IconSortUp',
})(Icon);

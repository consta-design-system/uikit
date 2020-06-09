import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSortDownSizeM from './IconSortDown_size_m';
import IconSortDownSizeS from './IconSortDown_size_s';
import IconSortDownSizeXs from './IconSortDown_size_xs';

export const IconSortDown = BaseIconHoc({
  m: IconSortDownSizeM,
  s: IconSortDownSizeS,
  xs: IconSortDownSizeXs,
  name: 'IconSortDown',
})(Icon);

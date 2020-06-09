import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSortUpCenterSizeM from './IconSortUpCenter_size_m';
import IconSortUpCenterSizeS from './IconSortUpCenter_size_s';
import IconSortUpCenterSizeXs from './IconSortUpCenter_size_xs';

export const IconSortUpCenter = BaseIconHoc({
  m: IconSortUpCenterSizeM,
  s: IconSortUpCenterSizeS,
  xs: IconSortUpCenterSizeXs,
  name: 'IconSortUpCenter',
})(Icon);

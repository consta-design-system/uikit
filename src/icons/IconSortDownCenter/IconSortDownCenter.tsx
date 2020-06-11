import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSortDownCenterSizeM from './IconSortDownCenter_size_m';
import IconSortDownCenterSizeS from './IconSortDownCenter_size_s';
import IconSortDownCenterSizeXs from './IconSortDownCenter_size_xs';

export const IconSortDownCenter = BaseIconHoc({
  m: IconSortDownCenterSizeM,
  s: IconSortDownCenterSizeS,
  xs: IconSortDownCenterSizeXs,
  name: 'IconSortDownCenter',
})(Icon);

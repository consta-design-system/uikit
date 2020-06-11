import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconFilterSizeM from './IconFilter_size_m';
import IconFilterSizeS from './IconFilter_size_s';
import IconFilterSizeXs from './IconFilter_size_xs';

export const IconFilter = BaseIconHoc({
  m: IconFilterSizeM,
  s: IconFilterSizeS,
  xs: IconFilterSizeXs,
  name: 'IconFilter',
})(Icon);

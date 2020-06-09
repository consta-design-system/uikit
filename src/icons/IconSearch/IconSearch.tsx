import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSearchSizeM from './IconSearch_size_m';
import IconSearchSizeS from './IconSearch_size_s';
import IconSearchSizeXs from './IconSearch_size_xs';

export const IconSearch = BaseIconHoc({
  m: IconSearchSizeM,
  s: IconSearchSizeS,
  xs: IconSearchSizeXs,
  name: 'IconSearch',
})(Icon);

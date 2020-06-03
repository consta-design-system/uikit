import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDownSizeM from './IconDown_size_m';
import IconDownSizeS from './IconDown_size_s';
import IconDownSizeXs from './IconDown_size_xs';

export const IconDown = BaseIconHoc({
  m: IconDownSizeM,
  s: IconDownSizeS,
  xs: IconDownSizeXs,
  name: 'IconDown',
})(Icon);

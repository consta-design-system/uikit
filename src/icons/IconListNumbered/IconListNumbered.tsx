import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconListNumberedSizeM from './IconListNumbered_size_m';
import IconListNumberedSizeS from './IconListNumbered_size_s';
import IconListNumberedSizeXs from './IconListNumbered_size_xs';

export const IconListNumbered = BaseIconHoc({
  m: IconListNumberedSizeM,
  s: IconListNumberedSizeS,
  xs: IconListNumberedSizeXs,
  name: 'IconListNumbered',
})(Icon);

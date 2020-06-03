import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBoldSizeM from './IconBold_size_m';
import IconBoldSizeS from './IconBold_size_s';
import IconBoldSizeXs from './IconBold_size_xs';

export const IconBold = BaseIconHoc({
  m: IconBoldSizeM,
  s: IconBoldSizeS,
  xs: IconBoldSizeXs,
  name: 'IconBold',
})(Icon);

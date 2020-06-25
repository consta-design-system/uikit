import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBagSizeM from './IconBag_size_m';
import IconBagSizeS from './IconBag_size_s';
import IconBagSizeXs from './IconBag_size_xs';

export const IconBag = BaseIconHoc({
  m: IconBagSizeM,
  s: IconBagSizeS,
  xs: IconBagSizeXs,
  name: 'IconBag',
})(Icon);

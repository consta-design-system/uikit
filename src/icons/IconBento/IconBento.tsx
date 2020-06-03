import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBentoSizeM from './IconBento_size_m';
import IconBentoSizeS from './IconBento_size_s';
import IconBentoSizeXs from './IconBento_size_xs';

export const IconBento = BaseIconHoc({
  m: IconBentoSizeM,
  s: IconBentoSizeS,
  xs: IconBentoSizeXs,
  name: 'IconBento',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconColorTextSizeM from './IconColorText_size_m';
import IconColorTextSizeS from './IconColorText_size_s';
import IconColorTextSizeXs from './IconColorText_size_xs';

export const IconColorText = BaseIconHoc({
  m: IconColorTextSizeM,
  s: IconColorTextSizeS,
  xs: IconColorTextSizeXs,
  name: 'IconColorText',
})(Icon);

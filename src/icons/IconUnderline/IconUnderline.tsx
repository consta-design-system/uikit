import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconUnderlineSizeM from './IconUnderline_size_m';
import IconUnderlineSizeS from './IconUnderline_size_s';
import IconUnderlineSizeXs from './IconUnderline_size_xs';

export const IconUnderline = BaseIconHoc({
  m: IconUnderlineSizeM,
  s: IconUnderlineSizeS,
  xs: IconUnderlineSizeXs,
  name: 'IconUnderline',
})(Icon);

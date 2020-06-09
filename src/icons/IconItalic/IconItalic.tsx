import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconItalicSizeM from './IconItalic_size_m';
import IconItalicSizeS from './IconItalic_size_s';
import IconItalicSizeXs from './IconItalic_size_xs';

export const IconItalic = BaseIconHoc({
  m: IconItalicSizeM,
  s: IconItalicSizeS,
  xs: IconItalicSizeXs,
  name: 'IconItalic',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDocBlankSizeM from './IconDocBlank_size_m';
import IconDocBlankSizeS from './IconDocBlank_size_s';
import IconDocBlankSizeXs from './IconDocBlank_size_xs';

export const IconDocBlank = BaseIconHoc({
  m: IconDocBlankSizeM,
  s: IconDocBlankSizeS,
  xs: IconDocBlankSizeXs,
  name: 'IconDocBlank',
})(Icon);

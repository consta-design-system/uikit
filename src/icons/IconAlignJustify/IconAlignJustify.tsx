import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAlignJustifySizeM from './IconAlignJustify_size_m';
import IconAlignJustifySizeS from './IconAlignJustify_size_s';
import IconAlignJustifySizeXs from './IconAlignJustify_size_xs';

export const IconAlignJustify = BaseIconHoc({
  m: IconAlignJustifySizeM,
  s: IconAlignJustifySizeS,
  xs: IconAlignJustifySizeXs,
  name: 'IconAlignJustify',
})(Icon);

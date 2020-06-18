import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconExpandSizeM from './IconExpand_size_m';
import IconExpandSizeS from './IconExpand_size_s';
import IconExpandSizeXs from './IconExpand_size_xs';

export const IconExpand = BaseIconHoc({
  m: IconExpandSizeM,
  s: IconExpandSizeS,
  xs: IconExpandSizeXs,
  name: 'IconExpand',
})(Icon);

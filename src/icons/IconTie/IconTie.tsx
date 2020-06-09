import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconTieSizeM from './IconTie_size_m';
import IconTieSizeS from './IconTie_size_s';
import IconTieSizeXs from './IconTie_size_xs';

export const IconTie = BaseIconHoc({
  m: IconTieSizeM,
  s: IconTieSizeS,
  xs: IconTieSizeXs,
  name: 'IconTie',
})(Icon);

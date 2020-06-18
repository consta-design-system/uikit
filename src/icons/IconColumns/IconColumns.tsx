import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconColumnsSizeM from './IconColumns_size_m';
import IconColumnsSizeS from './IconColumns_size_s';
import IconColumnsSizeXs from './IconColumns_size_xs';

export const IconColumns = BaseIconHoc({
  m: IconColumnsSizeM,
  s: IconColumnsSizeS,
  xs: IconColumnsSizeXs,
  name: 'IconColumns',
})(Icon);

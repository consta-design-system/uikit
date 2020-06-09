import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDocDeleteSizeM from './IconDocDelete_size_m';
import IconDocDeleteSizeS from './IconDocDelete_size_s';
import IconDocDeleteSizeXs from './IconDocDelete_size_xs';

export const IconDocDelete = BaseIconHoc({
  m: IconDocDeleteSizeM,
  s: IconDocDeleteSizeS,
  xs: IconDocDeleteSizeXs,
  name: 'IconDocDelete',
})(Icon);

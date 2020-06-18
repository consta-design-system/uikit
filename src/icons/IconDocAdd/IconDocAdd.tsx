import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDocAddSizeM from './IconDocAdd_size_m';
import IconDocAddSizeS from './IconDocAdd_size_s';
import IconDocAddSizeXs from './IconDocAdd_size_xs';

export const IconDocAdd = BaseIconHoc({
  m: IconDocAddSizeM,
  s: IconDocAddSizeS,
  xs: IconDocAddSizeXs,
  name: 'IconDocAdd',
})(Icon);

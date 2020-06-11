import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconUserSizeM from './IconUser_size_m';
import IconUserSizeS from './IconUser_size_s';
import IconUserSizeXs from './IconUser_size_xs';

export const IconUser = BaseIconHoc({
  m: IconUserSizeM,
  s: IconUserSizeS,
  xs: IconUserSizeXs,
  name: 'IconUser',
})(Icon);

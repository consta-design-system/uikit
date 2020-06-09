import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconPauseSizeM from './IconPause_size_m';
import IconPauseSizeS from './IconPause_size_s';
import IconPauseSizeXs from './IconPause_size_xs';

export const IconPause = BaseIconHoc({
  m: IconPauseSizeM,
  s: IconPauseSizeS,
  xs: IconPauseSizeXs,
  name: 'IconPause',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconShuffleSizeM from './IconShuffle_size_m';
import IconShuffleSizeS from './IconShuffle_size_s';
import IconShuffleSizeXs from './IconShuffle_size_xs';

export const IconShuffle = BaseIconHoc({
  m: IconShuffleSizeM,
  s: IconShuffleSizeS,
  xs: IconShuffleSizeXs,
  name: 'IconShuffle',
})(Icon);

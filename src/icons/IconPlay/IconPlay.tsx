import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconPlaySizeM from './IconPlay_size_m';
import IconPlaySizeS from './IconPlay_size_s';
import IconPlaySizeXs from './IconPlay_size_xs';

export const IconPlay = BaseIconHoc({
  m: IconPlaySizeM,
  s: IconPlaySizeS,
  xs: IconPlaySizeXs,
  name: 'IconPlay',
})(Icon);

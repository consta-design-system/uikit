import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconThumbUpSizeM from './IconThumbUp_size_m';
import IconThumbUpSizeS from './IconThumbUp_size_s';
import IconThumbUpSizeXs from './IconThumbUp_size_xs';

export const IconThumbUp = BaseIconHoc({
  m: IconThumbUpSizeM,
  s: IconThumbUpSizeS,
  xs: IconThumbUpSizeXs,
  name: 'IconThumbUp',
})(Icon);

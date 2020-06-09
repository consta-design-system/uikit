import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconPhotoSizeM from './IconPhoto_size_m';
import IconPhotoSizeS from './IconPhoto_size_s';
import IconPhotoSizeXs from './IconPhoto_size_xs';

export const IconPhoto = BaseIconHoc({
  m: IconPhotoSizeM,
  s: IconPhotoSizeS,
  xs: IconPhotoSizeXs,
  name: 'IconPhoto',
})(Icon);

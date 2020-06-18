import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCameraSizeM from './IconCamera_size_m';
import IconCameraSizeS from './IconCamera_size_s';
import IconCameraSizeXs from './IconCamera_size_xs';

export const IconCamera = BaseIconHoc({
  m: IconCameraSizeM,
  s: IconCameraSizeS,
  xs: IconCameraSizeXs,
  name: 'IconCamera',
})(Icon);

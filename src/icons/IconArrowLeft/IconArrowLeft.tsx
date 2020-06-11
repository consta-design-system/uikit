import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconArrowLeftSizeM from './IconArrowLeft_size_m';
import IconArrowLeftSizeS from './IconArrowLeft_size_s';
import IconArrowLeftSizeXs from './IconArrowLeft_size_xs';

export const IconArrowLeft = BaseIconHoc({
  m: IconArrowLeftSizeM,
  s: IconArrowLeftSizeS,
  xs: IconArrowLeftSizeXs,
  name: 'IconArrowLeft',
})(Icon);

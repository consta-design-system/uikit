import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconArrowRightSizeM from './IconArrowRight_size_m';
import IconArrowRightSizeS from './IconArrowRight_size_s';
import IconArrowRightSizeXs from './IconArrowRight_size_xs';

export const IconArrowRight = BaseIconHoc({
  m: IconArrowRightSizeM,
  s: IconArrowRightSizeS,
  xs: IconArrowRightSizeXs,
  name: 'IconArrowRight',
})(Icon);

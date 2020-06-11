import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBarrierSizeM from './IconBarrier_size_m';
import IconBarrierSizeS from './IconBarrier_size_s';
import IconBarrierSizeXs from './IconBarrier_size_xs';

export const IconBarrier = BaseIconHoc({
  m: IconBarrierSizeM,
  s: IconBarrierSizeS,
  xs: IconBarrierSizeXs,
  name: 'IconBarrier',
})(Icon);

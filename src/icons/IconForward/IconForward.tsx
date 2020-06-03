import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconForwardSizeM from './IconForward_size_m';
import IconForwardSizeS from './IconForward_size_s';
import IconForwardSizeXs from './IconForward_size_xs';

export const IconForward = BaseIconHoc({
  m: IconForwardSizeM,
  s: IconForwardSizeS,
  xs: IconForwardSizeXs,
  name: 'IconForward',
})(Icon);

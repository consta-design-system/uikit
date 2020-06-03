import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconFunnelSizeM from './IconFunnel_size_m';
import IconFunnelSizeS from './IconFunnel_size_s';
import IconFunnelSizeXs from './IconFunnel_size_xs';

export const IconFunnel = BaseIconHoc({
  m: IconFunnelSizeM,
  s: IconFunnelSizeS,
  xs: IconFunnelSizeXs,
  name: 'IconFunnel',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconStopSizeM from './IconStop_size_m';
import IconStopSizeS from './IconStop_size_s';
import IconStopSizeXs from './IconStop_size_xs';

export const IconStop = BaseIconHoc({
  m: IconStopSizeM,
  s: IconStopSizeS,
  xs: IconStopSizeXs,
  name: 'IconStop',
})(Icon);

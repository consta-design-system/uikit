import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconOpenInNewSizeM from './IconOpenInNew_size_m';
import IconOpenInNewSizeS from './IconOpenInNew_size_s';
import IconOpenInNewSizeXs from './IconOpenInNew_size_xs';

export const IconOpenInNew = BaseIconHoc({
  m: IconOpenInNewSizeM,
  s: IconOpenInNewSizeS,
  xs: IconOpenInNewSizeXs,
  name: 'IconOpenInNew',
})(Icon);

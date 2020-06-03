import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconConnectionSizeM from './IconConnection_size_m';
import IconConnectionSizeS from './IconConnection_size_s';
import IconConnectionSizeXs from './IconConnection_size_xs';

export const IconConnection = BaseIconHoc({
  m: IconConnectionSizeM,
  s: IconConnectionSizeS,
  xs: IconConnectionSizeXs,
  name: 'IconConnection',
})(Icon);

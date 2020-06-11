import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconWorldSizeM from './IconWorld_size_m';
import IconWorldSizeS from './IconWorld_size_s';
import IconWorldSizeXs from './IconWorld_size_xs';

export const IconWorld = BaseIconHoc({
  m: IconWorldSizeM,
  s: IconWorldSizeS,
  xs: IconWorldSizeXs,
  name: 'IconWorld',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBackwardSizeM from './IconBackward_size_m';
import IconBackwardSizeS from './IconBackward_size_s';
import IconBackwardSizeXs from './IconBackward_size_xs';

export const IconBackward = BaseIconHoc({
  m: IconBackwardSizeM,
  s: IconBackwardSizeS,
  xs: IconBackwardSizeXs,
  name: 'IconBackward',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconRemoveSizeM from './IconRemove_size_m';
import IconRemoveSizeS from './IconRemove_size_s';
import IconRemoveSizeXs from './IconRemove_size_xs';

export const IconRemove = BaseIconHoc({
  m: IconRemoveSizeM,
  s: IconRemoveSizeS,
  xs: IconRemoveSizeXs,
  name: 'IconRemove',
})(Icon);

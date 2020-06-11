import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCancelSizeM from './IconCancel_size_m';
import IconCancelSizeS from './IconCancel_size_s';
import IconCancelSizeXs from './IconCancel_size_xs';

export const IconCancel = BaseIconHoc({
  m: IconCancelSizeM,
  s: IconCancelSizeS,
  xs: IconCancelSizeXs,
  name: 'IconCancel',
})(Icon);

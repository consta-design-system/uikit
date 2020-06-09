import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconAddSizeM from './IconAdd_size_m';
import IconAddSizeS from './IconAdd_size_s';
import IconAddSizeXs from './IconAdd_size_xs';

export const IconAdd = BaseIconHoc({
  m: IconAddSizeM,
  s: IconAddSizeS,
  xs: IconAddSizeXs,
  name: 'IconAdd',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconLeafSizeM from './IconLeaf_size_m';
import IconLeafSizeS from './IconLeaf_size_s';
import IconLeafSizeXs from './IconLeaf_size_xs';

export const IconLeaf = BaseIconHoc({
  m: IconLeafSizeM,
  s: IconLeafSizeS,
  xs: IconLeafSizeXs,
  name: 'IconLeaf',
})(Icon);

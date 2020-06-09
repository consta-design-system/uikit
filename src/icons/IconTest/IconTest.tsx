import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconTestSizeM from './IconTest_size_m';
import IconTestSizeS from './IconTest_size_s';
import IconTestSizeXs from './IconTest_size_xs';

export const IconTest = BaseIconHoc({
  m: IconTestSizeM,
  s: IconTestSizeS,
  xs: IconTestSizeXs,
  name: 'IconTest',
})(Icon);

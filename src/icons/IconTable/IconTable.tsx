import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconTableSizeM from './IconTable_size_m';
import IconTableSizeS from './IconTable_size_s';
import IconTableSizeXs from './IconTable_size_xs';

export const IconTable = BaseIconHoc({
  m: IconTableSizeM,
  s: IconTableSizeS,
  xs: IconTableSizeXs,
  name: 'IconTable',
})(Icon);

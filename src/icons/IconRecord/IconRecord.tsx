import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconRecordSizeM from './IconRecord_size_m';
import IconRecordSizeS from './IconRecord_size_s';
import IconRecordSizeXs from './IconRecord_size_xs';

export const IconRecord = BaseIconHoc({
  m: IconRecordSizeM,
  s: IconRecordSizeS,
  xs: IconRecordSizeXs,
  name: 'IconRecord',
})(Icon);

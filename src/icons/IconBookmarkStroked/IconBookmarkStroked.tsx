import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBookmarkStrokedSizeM from './IconBookmarkStroked_size_m';
import IconBookmarkStrokedSizeS from './IconBookmarkStroked_size_s';
import IconBookmarkStrokedSizeXs from './IconBookmarkStroked_size_xs';

export const IconBookmarkStroked = BaseIconHoc({
  m: IconBookmarkStrokedSizeM,
  s: IconBookmarkStrokedSizeS,
  xs: IconBookmarkStrokedSizeXs,
  name: 'IconBookmarkStroked',
})(Icon);

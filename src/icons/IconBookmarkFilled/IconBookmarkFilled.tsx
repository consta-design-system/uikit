import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconBookmarkFilledSizeM from './IconBookmarkFilled_size_m';
import IconBookmarkFilledSizeS from './IconBookmarkFilled_size_s';
import IconBookmarkFilledSizeXs from './IconBookmarkFilled_size_xs';

export const IconBookmarkFilled = BaseIconHoc({
  m: IconBookmarkFilledSizeM,
  s: IconBookmarkFilledSizeS,
  xs: IconBookmarkFilledSizeXs,
  name: 'IconBookmarkFilled',
})(Icon);

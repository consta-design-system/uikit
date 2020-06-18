import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconStrikethroughSizeM from './IconStrikethrough_size_m';
import IconStrikethroughSizeS from './IconStrikethrough_size_s';
import IconStrikethroughSizeXs from './IconStrikethrough_size_xs';

export const IconStrikethrough = BaseIconHoc({
  m: IconStrikethroughSizeM,
  s: IconStrikethroughSizeS,
  xs: IconStrikethroughSizeXs,
  name: 'IconStrikethrough',
})(Icon);

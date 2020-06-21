import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconReplySizeM from './IconReply_size_m';
import IconReplySizeS from './IconReply_size_s';
import IconReplySizeXs from './IconReply_size_xs';

export const IconReply = BaseIconHoc({
  m: IconReplySizeM,
  s: IconReplySizeS,
  xs: IconReplySizeXs,
  name: 'IconReply',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconChatSizeM from './IconChat_size_m';
import IconChatSizeS from './IconChat_size_s';
import IconChatSizeXs from './IconChat_size_xs';

export const IconChat = BaseIconHoc({
  m: IconChatSizeM,
  s: IconChatSizeS,
  xs: IconChatSizeXs,
  name: 'IconChat',
})(Icon);

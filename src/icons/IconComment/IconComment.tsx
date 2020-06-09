import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconCommentSizeM from './IconComment_size_m';
import IconCommentSizeS from './IconComment_size_s';
import IconCommentSizeXs from './IconComment_size_xs';

export const IconComment = BaseIconHoc({
  m: IconCommentSizeM,
  s: IconCommentSizeS,
  xs: IconCommentSizeXs,
  name: 'IconComment',
})(Icon);

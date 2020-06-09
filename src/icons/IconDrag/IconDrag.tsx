import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDragSizeM from './IconDrag_size_m';
import IconDragSizeS from './IconDrag_size_s';
import IconDragSizeXs from './IconDrag_size_xs';

export const IconDrag = BaseIconHoc({
  m: IconDragSizeM,
  s: IconDragSizeS,
  xs: IconDragSizeXs,
  name: 'IconDrag',
})(Icon);

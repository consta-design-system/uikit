import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconTrashSizeM from './IconTrash_size_m';
import IconTrashSizeS from './IconTrash_size_s';
import IconTrashSizeXs from './IconTrash_size_xs';

export const IconTrash = BaseIconHoc({
  m: IconTrashSizeM,
  s: IconTrashSizeS,
  xs: IconTrashSizeXs,
  name: 'IconTrash',
})(Icon);

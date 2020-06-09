import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconDocFilledSizeM from './IconDocFilled_size_m';
import IconDocFilledSizeS from './IconDocFilled_size_s';
import IconDocFilledSizeXs from './IconDocFilled_size_xs';

export const IconDocFilled = BaseIconHoc({
  m: IconDocFilledSizeM,
  s: IconDocFilledSizeS,
  xs: IconDocFilledSizeXs,
  name: 'IconDocFilled',
})(Icon);

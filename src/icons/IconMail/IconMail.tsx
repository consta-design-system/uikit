import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconMailSizeM from './IconMail_size_m';
import IconMailSizeS from './IconMail_size_s';
import IconMailSizeXs from './IconMail_size_xs';

export const IconMail = BaseIconHoc({
  m: IconMailSizeM,
  s: IconMailSizeS,
  xs: IconMailSizeXs,
  name: 'IconMail',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconQuoteSizeM from './IconQuote_size_m';
import IconQuoteSizeS from './IconQuote_size_s';
import IconQuoteSizeXs from './IconQuote_size_xs';

export const IconQuote = BaseIconHoc({
  m: IconQuoteSizeM,
  s: IconQuoteSizeS,
  xs: IconQuoteSizeXs,
  name: 'IconQuote',
})(Icon);

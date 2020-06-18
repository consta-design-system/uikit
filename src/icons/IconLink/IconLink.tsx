import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconLinkSizeM from './IconLink_size_m';
import IconLinkSizeS from './IconLink_size_s';
import IconLinkSizeXs from './IconLink_size_xs';

export const IconLink = BaseIconHoc({
  m: IconLinkSizeM,
  s: IconLinkSizeS,
  xs: IconLinkSizeXs,
  name: 'IconLink',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconHamburgerSizeM from './IconHamburger_size_m';
import IconHamburgerSizeS from './IconHamburger_size_s';
import IconHamburgerSizeXs from './IconHamburger_size_xs';

export const IconHamburger = BaseIconHoc({
  m: IconHamburgerSizeM,
  s: IconHamburgerSizeS,
  xs: IconHamburgerSizeXs,
  name: 'IconHamburger',
})(Icon);

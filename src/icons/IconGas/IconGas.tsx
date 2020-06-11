import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconGasSizeM from './IconGas_size_m';
import IconGasSizeS from './IconGas_size_s';
import IconGasSizeXs from './IconGas_size_xs';

export const IconGas = BaseIconHoc({
  m: IconGasSizeM,
  s: IconGasSizeS,
  xs: IconGasSizeXs,
  name: 'IconGas',
})(Icon);

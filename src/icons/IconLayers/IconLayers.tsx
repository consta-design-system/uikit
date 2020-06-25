import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconLayersSizeM from './IconLayers_size_m';
import IconLayersSizeS from './IconLayers_size_s';
import IconLayersSizeXs from './IconLayers_size_xs';

export const IconLayers = BaseIconHoc({
  m: IconLayersSizeM,
  s: IconLayersSizeS,
  xs: IconLayersSizeXs,
  name: 'IconLayers',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconFavoriteSizeM from './IconFavorite_size_m';
import IconFavoriteSizeS from './IconFavorite_size_s';
import IconFavoriteSizeXs from './IconFavorite_size_xs';

export const IconFavorite = BaseIconHoc({
  m: IconFavoriteSizeM,
  s: IconFavoriteSizeS,
  xs: IconFavoriteSizeXs,
  name: 'IconFavorite',
})(Icon);

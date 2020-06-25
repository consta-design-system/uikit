import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconFoldersSizeM from './IconFolders_size_m';
import IconFoldersSizeS from './IconFolders_size_s';
import IconFoldersSizeXs from './IconFolders_size_xs';

export const IconFolders = BaseIconHoc({
  m: IconFoldersSizeM,
  s: IconFoldersSizeS,
  xs: IconFoldersSizeXs,
  name: 'IconFolders',
})(Icon);

import { BaseIconHoc } from '../BaseIconHoc/BaseIconHoc';
import { Icon } from '../Icon/Icon';

import IconSettingsSizeM from './IconSettings_size_m';
import IconSettingsSizeS from './IconSettings_size_s';
import IconSettingsSizeXs from './IconSettings_size_xs';

export const IconSettings = BaseIconHoc({
  m: IconSettingsSizeM,
  s: IconSettingsSizeS,
  xs: IconSettingsSizeXs,
  name: 'IconSettings',
})(Icon);

import '../Theme.css';
import '../_base/Theme_base_default.css';
import '../_border/Theme_border_default.css';
import '../_color/Theme_color_light.css';
import '../_color/Theme_color_dark.css';
import '../_shadow/Theme_shadow_default.css';
import '../_space/Theme_space_default.css';
import '../_typo/Theme_typo_default.css';
import '../_motion/Theme_motion_default.css';
import '../_radius/Theme_radius_default.css';
import '../_size/Theme_size_default.css';
import '../_bridge/Theme_bridge_default.css';

import { ThemePreset } from '../Theme';

export const presetGpnDark: ThemePreset = {
  color: {
    primary: 'dark',
    accent: 'dark',
    invert: 'light',
  },
  size: 'default',
  space: 'default',
  shadow: 'default',
  border: 'default',
  radius: 'default',
  typo: 'default',
  motion: 'default',
  bridge: 'default',
  base: 'default',
};

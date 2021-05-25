import '../Theme.css';
import '../_color/Theme_color_gpnDefault.css';
import '../_color/Theme_color_gpnDark.css';
import '../_control/Theme_control_gpnDefault.css';
import '../_font/Theme_font_gpnDefault.css';
import '../_size/Theme_size_gpnDefault.css';
import '../_space/Theme_space_gpnDefault.css';
import '../_shadow/Theme_shadow_gpnDefault.css';

import { ThemePreset } from '../Theme';

export const presetGpnDefault: ThemePreset = {
  color: {
    primary: 'gpnDefault',
    accent: 'gpnDark',
    invert: 'gpnDark',
  },
  control: 'gpnDefault',
  font: 'gpnDefault',
  size: 'gpnDefault',
  space: 'gpnDefault',
  shadow: 'gpnDefault',
};

import { IconProps } from '../../../icons/Icon/Icon';
import { IconLightningBolt } from '../../../icons/IconLightningBolt/IconLightningBolt';
import { IconMoon } from '../../../icons/IconMoon/IconMoon';
import { IconSun } from '../../../icons/IconSun/IconSun';
import { presetGpnDisplay } from '../../Theme/presets/presetGpnDisplay';
import { presetGpnDark, presetGpnDefault, ThemePreset } from '../../Theme/Theme';

export type Theme = {
  label: string;
  theme: ThemePreset;
  icon: React.FC<IconProps>;
};

export const exampleThemesTwo: Theme[] = [
  {
    theme: presetGpnDefault,
    label: 'Default',
    icon: IconSun,
  },
  {
    theme: presetGpnDark,
    label: 'Dark',
    icon: IconMoon,
  },
];

export const exampleThemesThree: Theme[] = [
  {
    theme: presetGpnDefault,
    label: 'Default',
    icon: IconSun,
  },
  {
    theme: presetGpnDark,
    label: 'Dark',
    icon: IconMoon,
  },
  {
    theme: presetGpnDisplay,
    label: 'Display',
    icon: IconLightningBolt,
  },
];

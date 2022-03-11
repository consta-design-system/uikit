import { IconComponent } from '../../../icons/Icon/Icon';
import { IconLightningBolt } from '../../../icons/IconLightningBolt/IconLightningBolt';
import { IconMoon } from '../../../icons/IconMoon/IconMoon';
import { IconSun } from '../../../icons/IconSun/IconSun';
import { presetGpnDisplay } from '../../Theme/presets/presetGpnDisplay';
import { presetGpnDark, presetGpnDefault, ThemePreset } from '../../Theme/Theme';

export type Theme = {
  label: string;
  theme: ThemePreset;
  icon: IconComponent;
  key: string;
};

export const exampleThemesTwo: Theme[] = [
  {
    theme: presetGpnDefault,
    label: 'Default',
    key: '1',
    icon: IconSun,
  },
  {
    theme: presetGpnDark,
    label: 'Dark',
    icon: IconMoon,
    key: '2',
  },
];

export const exampleThemesThree: Theme[] = [
  {
    theme: presetGpnDefault,
    label: 'Default',
    icon: IconSun,
    key: '1',
  },
  {
    theme: presetGpnDark,
    label: 'Dark',
    icon: IconMoon,
    key: '2',
  },
  {
    theme: presetGpnDisplay,
    label: 'Display',
    icon: IconLightningBolt,
    key: '3',
  },
];

import { IconComponent } from '@consta/icons/Icon';
import { IconLightningBolt } from '@consta/icons/IconLightningBolt';
import { IconMoon } from '@consta/icons/IconMoon';
import { IconSun } from '@consta/icons/IconSun';

import { presetGpnDisplay } from '../../Theme/presets/presetGpnDisplay';
import {
  presetGpnDark,
  presetGpnDefault,
  ThemePreset,
} from '../../Theme/Theme';

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

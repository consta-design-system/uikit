import './ThemeExampleRoot.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { Switch, SwitchProps } from '##/components/Switch';
import {
  presetGpnDark,
  presetGpnDefault,
  Theme,
  ThemePreset,
} from '##/components/Theme';
import { cn } from '##/utils/bem';

type ThemeName = 'gpnDefault' | 'gpnDark';

function getPreset(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  };
  return obj[themeName] || presetGpnDefault;
}

const cnExampleRoot = cn('ThemeExampleRoot');

export const ThemeExampleRoot: React.FC = () => {
  const [theme, setTheme] = useState<ThemeName>('gpnDefault');
  const handleChange: SwitchProps['onChange'] = (e) =>
    setTheme(e.target.checked ? 'gpnDark' : 'gpnDefault');

  return (
    <Example col={1}>
      <Theme preset={getPreset(theme)} className={cnExampleRoot('')}>
        <Switch
          label="Dark Mode"
          onChange={handleChange}
          checked={theme === 'gpnDark'}
        />
      </Theme>
    </Example>
  );
};

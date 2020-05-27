import './RootTheme.css';

import React, { useState } from 'react';
import {
  Theme,
  presetGpnDark,
  presetGpnDefault,
  ThemePreset,
} from '../../../../components/Theme/Theme';
import { cn } from '../../../../utils/bem';
import { Switch } from '../../../Switch/Switch';

type ThemeName = 'gpnDefault' | 'gpnDark';

function getPreset(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  };
  return obj[themeName] || presetGpnDefault;
}

const cnRootTheme = cn('RootTheme');

export const RootTheme: React.FC = () => {
  const [theme, setTheme] = useState<ThemeName>('gpnDefault');
  const handleChange = ({ checked }) => setTheme(checked ? 'gpnDark' : 'gpnDefault');

  return (
    <Theme preset={getPreset(theme)} className={cnRootTheme()}>
      <Switch label="Dark Mode" onChange={handleChange} checked={theme === 'gpnDark'} />
    </Theme>
  );
};

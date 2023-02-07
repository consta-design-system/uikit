import './ThemeExampleRoot.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '../../../../../utils/bem';
import { Switch, SwitchProps } from '../../../../Switch';
import {
  presetGpnDark,
  presetGpnDefault,
  Theme,
  ThemePreset,
} from '../../../Theme';

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
  const handleChange: SwitchProps['onChange'] = ({ checked }) =>
    setTheme(checked ? 'gpnDark' : 'gpnDefault');

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

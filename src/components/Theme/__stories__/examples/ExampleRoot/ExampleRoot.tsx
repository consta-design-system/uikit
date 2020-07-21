import './ExampleRoot.css';

import React, { useState } from 'react';

import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { Switch, SwitchProps } from '../../../../Switch/Switch';
import { presetGpnDark, presetGpnDefault, Theme, ThemePreset } from '../../../Theme';
import { cn } from '../../cn';

type ThemeName = 'gpnDefault' | 'gpnDark';

function getPreset(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  };
  return obj[themeName] || presetGpnDefault;
}

const cnExampleRoot = cn('ExampleRoot');

export const ExampleRoot: React.FC = () => {
  const [theme, setTheme] = useState<ThemeName>('gpnDefault');
  const handleChange: SwitchProps['onChange'] = ({ checked }) =>
    setTheme(checked ? 'gpnDark' : 'gpnDefault');

  return (
    <Theme preset={getPreset(theme)} className={cnExampleRoot('', [cnDocsDecorator('Section')])}>
      <Switch label="Dark Mode" onChange={handleChange} checked={theme === 'gpnDark'} />
    </Theme>
  );
};

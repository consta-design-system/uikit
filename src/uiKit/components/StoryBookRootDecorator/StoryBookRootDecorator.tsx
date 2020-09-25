import './StoryBookRootDecorator.css';
import '../../whitepaper/whitepaper.css';

import React from 'react';

import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme,
  ThemePreset,
} from '../../../components/Theme/Theme';
import { cn } from '../../cn';

type ThemeName = 'gpnDefault' | 'gpnDark' | 'gpnDisplay';
type StoryBookRootDecoratorProps = {
  themeName: ThemeName;
  className: string;
};

function getThemeByName(themeName: ThemeName): ThemePreset {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
    gpnDisplay: presetGpnDisplay,
  };
  return obj[themeName] || presetGpnDefault;
}

const cnStoryBookRootDecorator = cn('StoryBookRootDecorator');

export const StoryBookRootDecorator: React.FC<StoryBookRootDecoratorProps> = (props) => {
  const { children, themeName, className } = props;

  return (
    <Theme
      preset={getThemeByName(themeName)}
      className={cnStoryBookRootDecorator(null, ['theme_gap_medium', className])}
    >
      {children}
    </Theme>
  );
};

import React, { useContext, createContext, useState } from 'react';
import { cn } from '../../utils/bem';

export { presetGpnDefault } from './presets/presetGpnDefault';
export { presetGpnDark } from './presets/presetGpnDark';
export { presetGpnDisplay } from './presets/presetGpnDisplay';

export type ThemePreset = {
  color: {
    primary: string;
    accent: string;
    invert: string;
  };
  control: string;
  font: string;
  size: string;
  space: string;
  gap: string;
};

export const cnTheme = cn('Theme');

export const ThemeContext = createContext<{
  theme?: ThemePreset;
  setTheme?: React.Dispatch<React.SetStateAction<ThemePreset>>;
}>({});

export function createTheme(preset: ThemePreset) {
  const Component: React.FC<React.HtmlHTMLAttributes<HTMLDivElement>> = (props) => {
    const { className, children, ...otherProps } = props;
    const [theme, setTheme] = useState(preset);
    const mods = {
      ...theme,
      color: theme.color.primary,
    };

    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div {...otherProps} className={cnTheme(mods, [className])}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  };
  return Component;
}

export function useTheme() {
  return useContext(ThemeContext);
}

function createThemeSelecor(selector: (theme: ThemePreset) => string, defaultValue: string) {
  return function getter(theme: ThemePreset | undefined) {
    if (theme) {
      return selector(theme);
    }
    return defaultValue;
  };
}

export const getInvertColor = createThemeSelecor((theme) => theme.color.invert, 'gpnDark');
export const getAccentColor = createThemeSelecor((theme) => theme.color.accent, 'gpnDark');
export const getPrimaryColor = createThemeSelecor((theme) => theme.color.primary, 'gpnDefault');

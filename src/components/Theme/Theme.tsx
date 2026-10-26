import React, { createContext, useContext, useMemo } from 'react';

import { cn } from '##/utils/bem';
import { PropsWithHTMLAttributes } from '##/utils/types/PropsWithHTMLAttributes';

import { presetGpnDefault } from './presets/presetGpnDefault';

export { presetGpnDefault } from './presets/presetGpnDefault';
export { presetGpnDark } from './presets/presetGpnDark';
export { presetGpnDisplay } from './presets/presetGpnDisplay';

export type ThemePreset = {
  color: {
    primary: string;
    accent: string;
    invert: string;
  };
  size: string;
  base: string;
  border: string;
  radius: string;
  space: string;
  shadow: string;
  typo: string;
  bridge: string;
  motion: string;
};

type Props = {
  preset: ThemePreset;
};

export type ThemeProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnTheme = cn('Theme');

export const generateThemeClassNames = <
  T extends Record<string, string | Record<string, string>>,
>(
  preset: T,
): T => {
  return (Object.keys(preset) as Array<keyof T>).reduce((acc, key) => {
    const value = preset[key];
    if (value && typeof value === 'object') {
      const color = value as Record<string, string>;
      acc[key] = Object.keys(color).reduce(
        (accColor, colorKey) => {
          accColor[colorKey] = cnTheme({ color: color[colorKey] });
          return accColor;
        },
        {} as Record<string, string>,
      ) as T[keyof T];
    } else {
      acc[key] = cnTheme({ [key as string]: value as string }) as T[keyof T];
    }
    return acc;
  }, {} as T);
};

export const generateDeps = <
  T extends Record<string, string | Record<string, string>>,
>(
  preset: T,
): string => {
  return Object.keys(preset).reduce((deps, key) => {
    const value: string | Record<string, string> = preset[key];
    if (value && typeof value === 'object') {
      return (
        deps +
        Object.keys(value).reduce((acc, colorKey) => acc + value[colorKey], '')
      );
    }
    return deps + value;
  }, '');
};

const defaultContextValue = {
  theme: presetGpnDefault,
  themeClassNames: generateThemeClassNames(presetGpnDefault),
};

export const ThemeContext = createContext<{
  theme: ThemePreset;
  themeClassNames: ThemePreset;
}>(defaultContextValue);

export const Theme = React.forwardRef<HTMLDivElement, ThemeProps>(
  (props, ref) => {
    const { className, children, preset, ...otherProps } = props;

    const [value, mods] = useMemo(() => {
      return [
        { theme: preset, themeClassNames: generateThemeClassNames(preset) },
        {
          ...preset,
          color: preset.color.primary,
        },
      ];
    }, [generateDeps(preset)]);

    return (
      <ThemeContext.Provider value={value}>
        <div {...otherProps} ref={ref} className={cnTheme(mods, [className])}>
          {children}
        </div>
      </ThemeContext.Provider>
    );
  },
);

export function useTheme() {
  return useContext(ThemeContext);
}

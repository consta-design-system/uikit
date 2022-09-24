import React, { createContext, useContext, useMemo } from 'react';

import { cn } from '../../utils/bem';
import { PropsWithHTMLAttributes } from '../../utils/types/PropsWithHTMLAttributes';
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
  control: string;
  font: string;
  size: string;
  space: string;
  shadow: string;
};

type Props = {
  preset: ThemePreset;
};

export type ThemeProps = PropsWithHTMLAttributes<Props, HTMLDivElement>;

export const cnTheme = cn('Theme');

export const generateThemeClassNames = (preset: ThemePreset): ThemePreset => {
  return {
    color: {
      primary: cnTheme({ color: preset.color.primary }),
      accent: cnTheme({ color: preset.color.accent }),
      invert: cnTheme({ color: preset.color.invert }),
    },
    control: cnTheme({ control: preset.control }),
    font: cnTheme({ font: preset.font }),
    size: cnTheme({ size: preset.size }),
    space: cnTheme({ space: preset.space }),
    shadow: cnTheme({ shadow: preset.shadow }),
  };
};

export const generateDeps = (preset: ThemePreset) => {
  let deps = '';
  Object.keys(preset).map((key) => {
    if (key === 'color') {
      deps += preset.color.accent + preset.color.invert + preset.color.primary;
    } else {
      deps += preset[key as unknown as keyof ThemePreset];
    }
  });
  return deps;
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

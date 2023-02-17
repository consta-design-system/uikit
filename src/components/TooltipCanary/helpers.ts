import { useMemo } from 'react';

import {
  generateDeps,
  generateThemeClassNames,
  useTheme,
} from '##/components/Theme';

import { TooltipPropStatus } from './types';

export const useThemeByStatus = (status?: TooltipPropStatus) => {
  const { theme } = useTheme();

  const value = useMemo(() => {
    const tooltipTheme = status
      ? {
          ...theme,
          color: {
            primary: theme.color.accent,
            accent: theme.color.accent,
            invert: theme.color.primary,
          },
        }
      : {
          ...theme,
          color: {
            primary: theme.color.invert,
            accent: theme.color.accent,
            invert: theme.color.primary,
          },
        };

    return {
      theme: tooltipTheme,
      themeClassNames: generateThemeClassNames(tooltipTheme),
    };
  }, [generateDeps(theme), status]);

  return value;
};

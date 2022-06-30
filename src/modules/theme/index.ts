import { IconSun } from '@consta/uikit/IconSun';
import { IconComponent } from '@consta/uikit/Icon';
import { IconMoon } from '@consta/uikit/IconMoon';

import { presetGpnDark, presetGpnDefault, ThemePreset } from '@consta/uikit/Theme';

import { createAtom } from '@reatom/core';

export const themes = [presetGpnDark, presetGpnDefault];

export const iconsMap: Record<string, IconComponent> = {
  gpnDark: IconMoon,
  gpnDefault: IconSun,
};

export const getThemeKey = (theme: ThemePreset) => theme.color.primary;

export const getThemeIcon = (theme: ThemePreset) => iconsMap[theme.color.primary];

const localStorageItem = 'theme';

const localStorageSavedTheme = themes.find(
  (item) => item.color.primary === localStorage.getItem(localStorageItem),
);

const initialState = localStorageSavedTheme || presetGpnDefault;

export const themeAtom = createAtom(
  { set: (payload: ThemePreset) => payload },
  ({ onAction }, state = initialState) => {
    onAction('set', (payload) => {
      localStorage.setItem(localStorageItem, payload.color.primary);
      state = payload;
    });

    return state;
  },
);

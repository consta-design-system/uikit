import './ThemeTogglerExampleGetters.css';

import { Example } from '@consta/stand';
import React, { useState } from 'react';

import { cn } from '##/utils/bem';

import { IconLightningBolt } from '../../../../../icons/IconLightningBolt/IconLightningBolt';
import { IconMoon } from '../../../../../icons/IconMoon/IconMoon';
import { IconSun } from '../../../../../icons/IconSun/IconSun';
import {
  presetGpnDark,
  presetGpnDefault,
  presetGpnDisplay,
  Theme,
} from '../../../../Theme/Theme';
import { ThemeToggler } from '../../../ThemeToggler';

type Item = 'Default' | 'Dark' | 'Display';

const items: Item[] = ['Default', 'Dark', 'Display'];

const getItemIcon = (item: Item) => {
  if (item === 'Default') {
    return IconSun;
  }
  if (item === 'Dark') {
    return IconMoon;
  }
  return IconLightningBolt;
};

const getTheme = (item: Item) => {
  if (item === 'Default') {
    return presetGpnDefault;
  }
  if (item === 'Dark') {
    return presetGpnDark;
  }
  return presetGpnDisplay;
};

const cnThemeTogglerExampleGetters = cn('ThemeTogglerExampleGetters');

export const ThemeTogglerExampleGetters = () => {
  const [value, setValue] = useState<Item>(items[0]);

  return (
    <Example col={1}>
      <Theme
        preset={getTheme(value)}
        className={cnThemeTogglerExampleGetters()}
      >
        <ThemeToggler
          items={items}
          value={value}
          getItemLabel={(item) => item}
          getItemKey={(item) => item}
          getItemIcon={getItemIcon}
          onChange={({ value }) => setValue(value)}
          direction="downStartLeft"
        />
      </Theme>
    </Example>
  );
};

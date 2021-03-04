import './ThemeTogglerExampleQuantity.css';

import React, { FC, useState } from 'react';

import {
  exampleThemesThree,
  exampleThemesTwo,
  Theme as ThemeType,
} from '../../../__mocks__/mock.data';
import { IconProps } from '../../../../../icons/Icon/Icon';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Theme, ThemePreset } from '../../../../Theme/Theme';
import { ThemeToggler } from '../../../ThemeToggler';

const cnThemeTogglerExample = cn('ThemeTogglerExample');

export const ThemeTogglerExampleQuantityTwo = () => {
  const [value, setValue] = useState<ThemeType>(exampleThemesTwo[0]);
  const getThemeLabelDefault = (theme: ThemeType): string => theme.label;
  const getThemeValueDefault = (theme: ThemeType): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: ThemeType): FC<IconProps> => theme.icon;

  return (
    <Theme preset={value.theme} className={cnThemeTogglerExample('', [cnDocsDecorator('Section')])}>
      <ThemeToggler
        size="l"
        items={exampleThemesTwo}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemLabel={getThemeLabelDefault}
        getItemValue={getThemeValueDefault}
        getItemIcon={getThemeIconDefault}
        direction="downStartLeft"
      />
    </Theme>
  );
};

export const ThemeTogglerExampleQuantityThree = () => {
  const [value, setValue] = useState<ThemeType>(exampleThemesThree[0]);
  const getThemeLabelDefault = (theme: ThemeType): string => theme.label;
  const getThemeValueDefault = (theme: ThemeType): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: ThemeType): FC<IconProps> => theme.icon;

  return (
    <Theme preset={value.theme} className={cnThemeTogglerExample('', [cnDocsDecorator('Section')])}>
      <ThemeToggler
        size="l"
        items={exampleThemesThree}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemLabel={getThemeLabelDefault}
        getItemValue={getThemeValueDefault}
        getItemIcon={getThemeIconDefault}
        direction="downStartLeft"
      />
    </Theme>
  );
};

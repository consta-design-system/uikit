import './ThemeTogglerExampleQuantity.css';

import React, { FC, useState } from 'react';

import {
  exampleThemesThree,
  exampleThemesTwo,
  Theme as ThemeType,
} from '../../../__mocks__/data.mock';
import { IconProps } from '../../../../../icons/Icon/Icon';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { cn } from '../../../../../utils/bem';
import { Theme } from '../../../../Theme/Theme';
import { ThemeToggler } from '../../../ThemeToggler';

const cnThemeTogglerExample = cn('ThemeTogglerExample');

const GetThemeTogglerExampleQuantity = (items: ThemeType[]): JSX.Element => {
  const [value, setValue] = useState<ThemeType>(exampleThemesTwo[0]);
  const getThemeLabelDefault = (theme: ThemeType): string => theme.label;
  const getThemeIconDefault = (theme: ThemeType): FC<IconProps> => theme.icon;

  return (
    <Theme preset={value.theme} className={cnThemeTogglerExample('', [cnDocsDecorator('Section')])}>
      <ThemeToggler
        items={items}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemLabel={getThemeLabelDefault}
        getItemIcon={getThemeIconDefault}
        direction="downStartLeft"
      />
    </Theme>
  );
};

export const ThemeTogglerExampleQuantityTwo = () =>
  GetThemeTogglerExampleQuantity(exampleThemesTwo);

export const ThemeTogglerExampleQuantityThree = () =>
  GetThemeTogglerExampleQuantity(exampleThemesThree);

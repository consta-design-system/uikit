import React, { FC, useState } from 'react';

import { exampleThemesThree, exampleThemesTwo, Theme } from '../../../__mocks__/mock.data';
import { IconProps } from '../../../../../icons/Icon/Icon';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { ThemePreset } from '../../../../Theme/Theme';
import { ThemeToggler } from '../../../ThemeToggler';

export const ThemeTogglerExampleQuantityTwo = () => {
  const [value, setValue] = useState<ThemePreset>(exampleThemesTwo[0].theme);
  const getThemeValueDefault = (theme: Theme): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: Theme): FC<IconProps> => theme.icon;

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ThemeToggler
        size="l"
        themes={exampleThemesTwo}
        value={value}
        setValue={setValue}
        getThemeValue={getThemeValueDefault}
        getThemeIcon={getThemeIconDefault}
      />
    </StoryBookExample>
  );
};

export const ThemeTogglerExampleQuantityThree = () => {
  const [value, setValue] = useState<ThemePreset>(exampleThemesThree[0].theme);
  const getThemeLabelDefault = (theme: Theme): string => theme.label;
  const getThemeValueDefault = (theme: Theme): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: Theme): FC<IconProps> => theme.icon;

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ThemeToggler
        size="l"
        themes={exampleThemesThree}
        value={value}
        setValue={setValue}
        getThemeLabel={getThemeLabelDefault}
        getThemeValue={getThemeValueDefault}
        getThemeIcon={getThemeIconDefault}
      />
    </StoryBookExample>
  );
};

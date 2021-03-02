import './ThemeTogglerExampleQuantity.css';

import React, { FC, useState } from 'react';

import { exampleThemesThree, exampleThemesTwo, Theme } from '../../../__mocks__/mock.data';
import { IconProps } from '../../../../../icons/Icon/Icon';
import { cnDocsDecorator } from '../../../../../uiKit/components/DocsDecorator/DocsDecorator';
import { StoryBookExample } from '../../../../../uiKit/components/StoryBookExample/StoryBookExample';
import { cn } from '../../../../../utils/bem';
import { Theme as ThemeContainer, ThemePreset } from '../../../../Theme/Theme';
import { ThemeToggler } from '../../../ThemeToggler';

const cnThemeTogglerExample = cn('ThemeTogglerExample');

export const ThemeTogglerExampleQuantityTwo = () => {
  const [value, setValue] = useState<Theme>(exampleThemesTwo[0]);
  const getThemeLabelDefault = (theme: Theme): string => theme.label;
  const getThemeValueDefault = (theme: Theme): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: Theme): FC<IconProps> => theme.icon;

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ThemeContainer preset={value.theme} className={cnThemeTogglerExample()}>
        <ThemeToggler
          size="l"
          themes={exampleThemesTwo}
          value={value}
          setValue={({ value }) => setValue(value)}
          getThemeLabel={getThemeLabelDefault}
          getThemeValue={getThemeValueDefault}
          getThemeIcon={getThemeIconDefault}
        />
      </ThemeContainer>
    </StoryBookExample>
  );
};

export const ThemeTogglerExampleQuantityThree = () => {
  const [value, setValue] = useState<Theme>(exampleThemesThree[0]);
  const getThemeLabelDefault = (theme: Theme): string => theme.label;
  const getThemeValueDefault = (theme: Theme): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: Theme): FC<IconProps> => theme.icon;

  return (
    <StoryBookExample className={cnDocsDecorator('Section')}>
      <ThemeContainer preset={value.theme} className={cnThemeTogglerExample()}>
        <ThemeToggler
          size="l"
          themes={exampleThemesThree}
          value={value}
          setValue={({ value }) => setValue(value)}
          getThemeLabel={getThemeLabelDefault}
          getThemeValue={getThemeValueDefault}
          getThemeIcon={getThemeIconDefault}
        />
      </ThemeContainer>
    </StoryBookExample>
  );
};

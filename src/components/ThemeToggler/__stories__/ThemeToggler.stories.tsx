import './ThemeToggler.stories.css';

import React, { FC, useState } from 'react';
import { select } from '@storybook/addon-knobs';

import { exampleThemesThree, exampleThemesTwo, Theme as ThemeType } from '../__mocks__/mock.data';
import { IconProps } from '../../../icons/Icon/Icon';
import { cn } from '../../../utils/bem';
import { createMetadata, createStory } from '../../../utils/storybook';
import { Theme, ThemePreset } from '../../Theme/Theme';
import { ThemeToggler, themeTogglerPropSize, themeTogglerPropSizeDefault } from '../ThemeToggler';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './ThemeToggler.mdx';

const cnThemeTogglerStories = cn('ThemeToggler');

const defaultKnobs = () => ({
  size: select('size', themeTogglerPropSize, themeTogglerPropSizeDefault),
});

const Default = (props: { themes: ThemeType[] }) => {
  const [value, setValue] = useState<ThemePreset>(props.themes[0].theme);
  const { size } = defaultKnobs();
  const getThemeLabelDefault = (theme: ThemeType): string => theme.label;
  const getThemeValueDefault = (theme: ThemeType): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: ThemeType): FC<IconProps> => theme.icon;

  return (
    <Theme preset={value} className={cnThemeTogglerStories()}>
      <ThemeToggler
        size={size}
        themes={props.themes}
        value={value}
        setValue={setValue}
        getThemeLabel={getThemeLabelDefault}
        getThemeValue={getThemeValueDefault}
        getThemeIcon={getThemeIconDefault}
      />
    </Theme>
  );
};

export const WithValueStory = createStory(() => <Default themes={exampleThemesTwo} />, {
  name: 'Две темы',
});

export const WithThreeValueStory = createStory(() => <Default themes={exampleThemesThree} />, {
  name: 'Три темы',
});

export default createMetadata({
  title: 'Компоненты|/ThemeToggler',
  id: 'components/ThemeToggler',
  parameters: {
    docs: {
      page: mdx,
    },
  },
});

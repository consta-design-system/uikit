import React, { FC, useState } from 'react';
import { select } from '@storybook/addon-knobs';

import { exampleThemesThree, exampleThemesTwo, Theme } from '../__mocks__/mock.data';
import { IconProps } from '../../../icons/Icon/Icon';
import { createMetadata, createStory } from '../../../utils/storybook';
import { ThemePreset } from '../../Theme/Theme';
import { ThemeToggler, themeTogglerPropSize, themeTogglerPropSizeDefault } from '../ThemeToggler';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './ThemeToggler.mdx';

const defaultKnobs = () => ({
  size: select('size', themeTogglerPropSize, themeTogglerPropSizeDefault),
});

const Default = (props: { themes: Theme[] }) => {
  const [value, setValue] = useState<ThemePreset>(props.themes[0].theme);
  const { size } = defaultKnobs();
  const getThemeLabelDefault = (theme: Theme): string => theme.label;
  const getThemeValueDefault = (theme: Theme): ThemePreset => theme.theme;
  const getThemeIconDefault = (theme: Theme): FC<IconProps> => theme.icon;

  return (
    <ThemeToggler
      size={size}
      themes={props.themes}
      value={value}
      setValue={setValue}
      getThemeLabel={getThemeLabelDefault}
      getThemeValue={getThemeValueDefault}
      getThemeIcon={getThemeIconDefault}
    />
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

import './ThemeToggler.stories.css';

import React, { FC, useState } from 'react';
import { object, select } from '@storybook/addon-knobs';

import { exampleThemesThree, exampleThemesTwo, Theme as ThemeType } from '../__mocks__/data.mock';
import { IconProps } from '../../../icons/Icon/Icon';
import { cn } from '../../../utils/bem';
import { createMetadata } from '../../../utils/storybook';
import { directions } from '../../Popover/Popover';
import { Theme } from '../../Theme/Theme';
import { ThemeToggler, themeTogglerPropSize, themeTogglerPropSizeDefault } from '../ThemeToggler';

import mdx from './ThemeToggler.docs.mdx';

const cnThemeTogglerStories = cn('ThemeTogglerStories');

const defaultKnobs = () => ({
  size: select('size', themeTogglerPropSize, themeTogglerPropSizeDefault),
  themes: select('number of themes', ['two', 'three'], 'two'),
  direction: select('direction', directions, 'downStartLeft'),
  possibleDirections: object('possibleDirections', directions),
});

export function Playground() {
  const { size, themes, direction, possibleDirections } = defaultKnobs();
  const themeArray = themes === 'two' ? exampleThemesTwo : exampleThemesThree;
  const [value, setValue] = useState<ThemeType>(themeArray[0]);
  const getThemeLabelDefault = (theme: ThemeType): string => theme.label;
  const getThemeIconDefault = (theme: ThemeType): FC<IconProps> => theme.icon;

  return (
    <Theme preset={value.theme} className={cnThemeTogglerStories()}>
      <ThemeToggler
        size={size}
        items={themeArray}
        value={value}
        onChange={({ value }) => setValue(value)}
        getItemLabel={getThemeLabelDefault}
        getItemIcon={getThemeIconDefault}
        direction={direction}
        possibleDirections={possibleDirections}
      />
    </Theme>
  );
}

export default createMetadata({
  title: 'Компоненты|/Служебные/ThemeToggler',
  id: 'components/ThemeToggler',
  parameters: {
    docs: {
      page: mdx,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/v9Jkm2GrymD277dIGpRBSH/Consta-UI-Kit?node-id=10241%3A0',
    },
  },
});

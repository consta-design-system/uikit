import React from 'react';
import { select } from '@storybook/addon-knobs';

import { createMetadata, createStory } from '../../../utils/storybook';
import { presetGpnDark, presetGpnDefault, ThemePreset } from '../../Theme/Theme';
import { ThemeToggler, themeTogglerPropSize, themeTogglerPropSizeDefault } from '../ThemeToggler';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import mdx from './ThemeToggler.mdx';

const defaultKnobs = () => ({
  size: select('size', themeTogglerPropSize, themeTogglerPropSizeDefault),
});

type ThemeNameTwo = 'gpnDefault' | 'gpnDark';

const getPresetTwo = (themeName: string): ThemePreset => {
  const obj = {
    gpnDefault: presetGpnDefault,
    gpnDark: presetGpnDark,
  };
  return obj[themeName as ThemeNameTwo] || presetGpnDefault;
};

const Default = (props: { getPreset: (themeName: string) => ThemePreset }) => {
  const { size } = defaultKnobs();

  return <ThemeToggler size={size} getPreset={props.getPreset} />;
};

export const WithValueStory = createStory(() => <Default getPreset={getPresetTwo} />, {
  name: 'Две темы',
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

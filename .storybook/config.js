import '../src/utils/whitepaper/whitepaper.css';
import '../src/components/Theme/Theme.css';
import '../src/components/Theme/_color/Theme_color_gpnDark.css';
import '../src/components/Theme/_color/Theme_color_gpnDefault.css';
import '../src/components/Theme/_color/Theme_color_gpnDisplay.css';
import '../src/components/Theme/_control/Theme_control_gpnDefault.css';
import '../src/components/Theme/_font/theme_font_gpnDefault.css';
import '../src/components/Theme/_size/Theme_size_gpnDefault.css';
import '../src/components/Theme/_space/Theme_space_gpnDefault.css';
import '../src/components/Theme/_gap/Theme_gap_l.css';
import '../src/components/Theme/_gap/Theme_gap_m.css';
import '../src/components/Theme/_gap/Theme_gap_s.css';

import '../src/index.css';

import React from 'react';
import requireContext from 'require-context.macro';

// Storybook modules
import { addParameters, configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { withThemes } from 'storybook-addon-themes';

import whitepaperStorybookTheme from './whitepaperStorybookTheme';

// Подключаем все темы для возможности переключения в storybook'е
const requireTheme = requireContext('../src/themes', false, /\.css$/);
requireTheme.keys().forEach((filename) => requireTheme(filename));

addParameters({
  options: {
    theme: whitepaperStorybookTheme,
  },
  // Эта переменная определяется через DefinePlugin в src/webpack.config.js и в src/setupTests.js
  // eslint-disable-next-line no-undef
  themes: WHITEPAPER_THEMES,
});

addDecorator(withA11y);

addDecorator((story) => {
  return story();
});

addDecorator((story) => {
  const appStyles = {
    background: 'var(--color-bg-default)',
    padding: 'var(--space-l)',
    minHeight: '100vh',
    boxSizing: 'border-box',
  };

  return (
    <div id="app" style={appStyles}>
      {story()}
    </div>
  );
});

addDecorator(withThemes);

const req = requireContext('../src', true, /.stories.(j|t)sx$/); // TODO: изменить на /.stories.tsx$/

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);

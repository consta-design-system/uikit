import React from 'react';
import requireContext from 'require-context.macro';

// Storybook modules
import { addParameters, configure, addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import whitepaperStorybookTheme from './whitepaperStorybookTheme';
import '../src/whitepaper.css';
import '../src/index.css';

// Подключаем все темы для возможности переключения в storybook'е
const requireTheme = requireContext('../src/themes', false, /\.css$/);
requireTheme.keys().forEach(filename => requireTheme(filename));

addParameters({
  options: {
    theme: whitepaperStorybookTheme,
  },
  // Эта переменная определяется через DefinePlugin в src/webpack.config.js и в src/setupTests.js
  // eslint-disable-next-line no-undef
  themes: WHITEPAPER_THEMES,
});

addDecorator(withA11y);

addDecorator(story => {
  return story();
});

addDecorator(story => {
  const appStyles = {
    background: 'var(--color-bg-default)',
    padding: 'var(--space-3xl)',
    minHeight: '100vh',
  };

  return (
    <div id="app" style={appStyles}>
      {story()}
    </div>
  );
});

const req = requireContext('../src', true, /.stories.(j|t)sx$/); // TODO: изменить на /.stories.tsx$/

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

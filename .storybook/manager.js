import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

import logo from './logo.svg';

const colors = {
  '--color-bg-normal': 'rgb(86, 185, 242)',
  '--color-bg-default': 'rgb(255, 255, 255)',
  '--color-bg-border': 'rgba(0, 100, 158, 0.2)',
  '--color-typo-primary': 'rgb(0, 32, 51)',
  '--color-typo-normal': 'rgb(51, 180, 255)',
  '--color-typo-secondary': 'rgba(0, 32, 51, 0.6)',
  '--color-control-bg-default': 'rgb(255, 255, 255)',
  '--color-control-bg-border-default': 'rgba(0, 66, 105, 0.28)',
  '--color-control-typo-default': 'rgb(0, 32, 51)',
};

addons.setConfig({
  theme: create({
    // preset name used by default
    base: 'light',
    colorPrimary: colors['--color-bg-normal'],
    colorSecondary: colors['--color-bg-normal'],
    // UI
    appBg: colors['--color-bg-default'],
    appContentBg: colors['--color-bg-default'],
    appBorderColor: colors['--color-bg-border'],
    appBorderRadius: 4,
    // Typography
    fontBase:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontCode:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Monaco, Courier, monospace, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    // Text colors
    textColor: colors['--color-typo-primary'],
    textInverseColor: 'rgba(255,255,255,0.9)',
    // Toolbar default and active colors
    barTextColor: colors['--color-typo-secondary'],
    barSelectedColor: colors['--color-typo-normal'],
    barBg: colors['--color-bg-default'],
    // Form colors
    inputBg: colors['--color-control-bg-default'],
    inputBorder: colors['--color-control-bg-border-default'],
    inputTextColor: colors['--color-control-typo-default'],
    inputBorderRadius: 4,
    brandTitle: 'Consta UI-kit storybook',
    brandUrl: 'https://consta-uikit.vercel.app',
    brandImage: logo,
  }),
});

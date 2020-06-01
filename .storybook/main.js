module.exports = {
  stories: ['../src/**/*.stories.(js|tsx)', '../src/**/**.stories.(js|tsx)'],
  addons: [
    'storybook-addon-themes/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs/register',
    '@storybook-addons/docs/register',
  ],
};

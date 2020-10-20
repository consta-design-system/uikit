const remarkSlug = require('../node_modules/remark-slug');
const remarkExternalLinks = require('../node_modules/remark-external-links');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  stories: ['../docs/*.mdx', '../docs/**/*.mdx', '../src/**/*.stories.(js|tsx)'],
  addons: [
    'storybook-addon-themes/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-actions/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs/register',
  ],
  webpackFinal: async (config) => {
    // Remove the existing css rule
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.filter((f) => f.test.toString() !== '/\\.css$/');
    // config.module.rules = config.module.rules.filter((f) => f.test.toString().indexOf('svg') === -1);

    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
      ],
    });

    config.module.rules.push({
      test: /(\/|\\)src(\/|\\)[\w/\\.-]*\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkSlug, remarkExternalLinks],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /(\/|\\)docs(\/|\\)[\w/\\.-]*\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkSlug, remarkExternalLinks],
            compilers: [createCompiler({})],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /(stories)\/(.*)\.tsx?$/,
      loader: require.resolve('@storybook/source-loader'),
      exclude: [/node_modules/],
      enforce: 'pre',
    });

    return config;
  },
};

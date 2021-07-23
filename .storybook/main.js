const remarkSlug = require('../node_modules/remark-slug');
const remarkExternalLinks = require('../node_modules/remark-external-links');
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = {
  stories: ['../**/*.stories.(js|tsx|mdx)'],
  addons: [
    '@storybook/addon-knobs',
    'storybook-addon-themes',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs/register',
    'storybook-addon-designs',
  ],
  webpackFinal: async (config) => {
    // Remove the existing css rule
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.filter((f) => f.test.toString() !== '/\\.css$/');
    // config.module.rules = config.module.rules.filter((f) => f.test.toString().indexOf('svg') === -1);

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: { sourceMap: true },
        },
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
      test: /\.docs\.mdx$/,
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
      test: /\.stories\.mdx$/,
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

    config.module.rules.push({
      test: /(\/|\\)docs(\/|\\)[\w/\\.-]*\.tsx?$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      ],
    });

    return config;
  },
};

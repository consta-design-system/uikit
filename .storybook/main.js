module.exports = {
  stories: ['../src/**/*.stories.(js|tsx)'],
  addons: [
    'storybook-addon-themes/register',
    '@storybook/addon-knobs/register',
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs/register',
    '@storybook-addons/docs/register',
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
      test: /\.mdx$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
        {
          loader: '@mdx-js/loader',
          options: {},
        },
      ],
    });

    return config;
  },
};

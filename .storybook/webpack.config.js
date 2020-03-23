const webpack = require('webpack');
const getWhitepaperThemes = require('../src/themes/getWhitepaperThemes');

module.exports = async ({ config }) => {
  // Remove the existing css rule
  config.module.rules = config.module.rules.filter(f => f.test.toString() !== '/\\.css$/');

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

  config.plugins.push(
    new webpack.DefinePlugin({
      WHITEPAPER_THEMES: JSON.stringify(getWhitepaperThemes()),
    }),
  );

  return config;
};

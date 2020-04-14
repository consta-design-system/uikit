const webpack = require('webpack');
const getWhitepaperThemes = require('../src/themes/getWhitepaperThemes');

module.exports = async ({ config }) => {
  // Remove the existing css rule
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

  // config.module.rules.push({
  //   test: /\.svg$/,
  //   use: [
  //     {
  //       loader: '@svgr/webpack',
  //     },
  //   ],
  // });
  //
  // config.module.rules.push({
  //   test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
  //   loader: 'file-loader',
  //   query: { name: 'static/media/[name].[hash:8].[ext]' },
  // });

  config.plugins.push(
    new webpack.DefinePlugin({
      WHITEPAPER_THEMES: JSON.stringify(getWhitepaperThemes()),
    })
  );

  return config;
};

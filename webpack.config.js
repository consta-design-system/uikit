const path = require('path');
const webpack = require('webpack');

const productionMode = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

const isEnvDevelopment = process.env.NODE_ENV === 'development' || 'standDevelopment';
const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvStandDevelopment = process.env.NODE_ENV === 'standDevelopment';

console.log(path.resolve(__dirname, '../../../src'));

module.exports = function () {
  return {
    target: 'web',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    // cache: !isEnvStandDevelopment,
    cache: false,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: require.resolve('babel-loader'),
          include: [path.resolve(__dirname, './src')],
          resolve: {
            alias: {
              '##': path.resolve(__dirname, './src'),
            },
          },
        },
        {
          test: /\.tsx?$/,
          use: require.resolve('babel-loader'),
          exclude: [path.resolve(__dirname, './src')],
          resolve: {
            alias: {
              '##': path.resolve(__dirname, '../../../src'),
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            productionMode ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: '@mdx-js/loader',
              options: {},
            },
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: false,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),

      isEnvProduction && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),

      new webpack.ProgressPlugin(),

      new MiniCssExtractPlugin({ filename: 'styles.css' }),

      new CssMinimizerPlugin(),
    ].filter(Boolean),

    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'build'),
      ...(isEnvProduction && {
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        assetModuleFilename: 'static/media/[name].[hash][ext]',
      }),
      publicPath: '/',
    },

    devServer: {
      historyApiFallback: true,
    },
  };
};

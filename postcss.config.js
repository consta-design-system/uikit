/* eslint-disable global-require */
module.exports = () => ({
  plugins: [
    require('postcss-mixins'),
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-color-function'),
    require('postcss-nested'),
    process.env.NODE_ENV === 'buildProduction' &&
      require('cssnano')({
        preset: [
          'default',
          {
            mergeLonghand: false,
          },
        ],
      }),
  ],
});

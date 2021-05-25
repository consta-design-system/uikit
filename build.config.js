module.exports = {
  srcPath: './src',
  // NOTE: ignore уберет файлы из reExport, но в бандле файлы отстанутся
  // для ts это правило описывается в tsconfig::exclude.
  ignore: [
    'src/internal/**',
    'src/**/*.stories/**',
    'src/**/*.stories.*',
    'src/components/ScrollExample/**',
    'src/fileIcons/createFileIcon/**',
    'src/uiKit/**',
    'src/**/__tests__/**',
    'src/**/__stories__/**',
    'src/**/__mocks__/**',
    'src/**/__mock__/**',
  ],
  tsconfig: 'tsconfig.json',
  postcssConfig: 'postcss.config.js',
  distPath: './dist',
  postcss: [
    require('postcss-mixins')({}),
    require('postcss-simple-vars')({ silent: true }),
    require('postcss-color-function')({}),
    require('autoprefixer')({}),
    require('postcss-nested')({}),
  ],
};

module.exports = {
  srcPath: './src',
  // NOTE: ignore уберет файлы из reExport, но в бандле файлы отстанутся
  // для ts это правило описывается в tsconfig::exclude.
  ignore: [
    'src/internal/**',
    'src/index.css',
    'src/__tests__/**',
    'src/**/*.stories/**',
    'src/**/*.stories.*',
    'src/components/_bricks/**',
    'src/components/Common/**',
    'src/components/ScrollExample/**',
    'src/components/ThemePreview/**',
    'src/components/ThemePreview/**',
    'src/components/TagBase/**',
    'src/components/BaseCheckGroupField/**',
    'src/icons/BaseIconHoc/**',
    'src/fileIcons/BaseFileIconHoc/**',
    'src/themes/**',
    'src/uiKit/**',
  ],
  tsconfig: 'tsconfig.json',
  postcssConfig: 'postcss.config.js',
  distPath: './dist',
  postcss: [
    require('postcss-simple-vars')({ silent: true }),
    require('postcss-color-function')({}),
    require('autoprefixer')({}),
    require('postcss-calc')({}),
    require('postcss-nested')({}),
  ],
};

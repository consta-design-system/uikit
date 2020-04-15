// const { execSync } = require('child_process');
// const { readFileSync, writeFileSync } = require('fs');

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
    'src/components/Input/**',
    'src/components/_bricks/**',
    'src/components/Common/**',
    'src/components/ScrollExample/**',
    'src/components/Select/**',
    'src/components/ThemePreview/**',
    'src/components/File/**',
    'src/components/Icon/**',
    'src/components/Popover/**',
    'src/components/Textarea/**',
    'src/components/ThemePreview/**',
    'src/icons/BaseIconHoc/**',
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

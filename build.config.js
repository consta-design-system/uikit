// const { execSync } = require('child_process');
// const { readFileSync, writeFileSync } = require('fs');

module.exports = {
  srcPath: './src',
  // NOTE: ignore используется при обработке статики или css,
  // но не ts файлов, для ts это правило описывается в tsconfig::exclude.
  ignore: [
    'src/internal/**',
    'src/index.css',
    'src/__tests__/**',
    'src/components/index.ts',
    'src/components/**/*.tests/**/*.png',
    'src/components/**/*.tests/**/*.css',
    'src/components/**/*.stories/**',
    'src/components/**/*.stories.*',
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
  // afterBuild: () => {
  //   execSync('rm -rf Theme');
  //   // Копируем компонент `Theme` в рут после компиляции,
  //   // т.к. он не является реакт-компонентом,
  //   // и не создается автоматически при компиляции.
  //   execSync('cp -r __internal__/cjs-src/components/Theme Theme', { stdio: 'inherit' });
  //   // Корректируем пути в импортах:
  //   // `../../lib/canUseDom` -> `../__internal__/cjs-src/lib/canUseDom`.
  //   writeFileSync(
  //     'Theme/index.js',
  //     readFileSync('Theme/index.js', 'utf-8').replace(/(\.\.\/){1,}/, '../__internal__/cjs-src/')
  //   );
  //   writeFileSync(
  //     'Theme/index.d.ts',
  //     readFileSync('Theme/index.d.ts', 'utf-8').replace(/(\.\.\/){1,}/, '../__internal__/cjs-src/')
  //   );
  // },
};

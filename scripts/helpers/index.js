const { normalize, dirname, join, relative, resolve } = require('path');
const {
  readFile,
  writeFile,
  ensureDir,
  remove,
  readJSON,
  writeJSON,
  copyFile,
} = require('fs-extra');
const logSymbols = require('log-symbols');
const fg = require('fast-glob');
const postcss = require('postcss');
const { react } = require('@bem/sdk.naming.presets');
const createMatch = require('@bem/sdk.naming.cell.match');
const svgr = require('@svgr/core').default;
const { svgParse } = require('./svgParse');
const { generateReExportsFonts } = require('./generateReExportsFonts');

// TODO: https://github.com/bem/bem-sdk/issues/385
const enhancedReactNaming = {
  ...react,
  wordPattern: '[a-zA-Z0-9-]+',
};

const nestedModernMatch = createMatch(enhancedReactNaming);

const iconFileComponentIsValid = (obj) => {
  return !!(obj.m && obj.s);
};

const iconComponentIsValid = (obj) => {
  return !!(obj.m || obj.s || obj.xs);
};

const copyPackageJson = async (distPaths) => {
  const pack = await readJSON('package.json');
  delete pack.devDependencies;
  delete pack.jest;
  delete pack.husky;
  delete pack.scripts;
  delete pack.browserslist;
  delete pack['lint-staged'];
  const outPaths = `${distPaths}/package.json`;
  await ensureDir(dirname(outPaths));
  await writeJSON(outPaths, pack, { spaces: 2 });
};

const copyReadme = async (distPaths) => {
  await copyFile('README.md', `${distPaths}/README.md`);
};

const copyChangelog = async (distPaths) => {
  await copyFile('CHANGELOG.md', `${distPaths}/CHANGELOG.md`);
};

const transformCSS = async (ignore, src, distPaths, options) => {
  const { postcss: postcssUserPlugins = [] } = options;
  const cssFiles = await fg([`${src}/**/*.{css,scss}`], { ignore });
  const firstDistPath = distPaths[0];
  // const { plugins: postcssDefaultPlugins } = getPostcssConf(namespace, naming);
  const postcssProcessor = postcss([
    // ...postcssDefaultPlugins,
    ...postcssUserPlugins,
  ]);

  cssFiles.forEach(async (fileName) => {
    const css = await readFile(fileName);
    const distFilename = resolve(firstDistPath, relative(src, fileName));
    const processedCss = await postcssProcessor.process(css, {
      from: fileName,
      to: distFilename,
    });
    for (const distPath of distPaths) {
      const newPath = resolve(distPath, relative(src, fileName));
      await ensureDir(dirname(newPath));
      writeFile(newPath, processedCss);
    }
  });
};

function sortComponent(a, b) {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
}

const createIconStories = async (svgComponents, src) => {
  const templatePath = './scripts/templates/Icons.stories.tsx.template';
  const template = await readFile(templatePath, 'utf8');

  let imports = '';
  let icons = '';

  Object.keys(svgComponents)
    .sort(sortComponent)
    .forEach(async (componentName) => {
      if (iconComponentIsValid(svgComponents[componentName])) {
        imports += `import { ${componentName} } from '../../../${componentName}';\n`;
        icons += `${componentName},\n`;
      }
    });

  const jsCode = template
    .replace(/#imports#/g, imports)
    .replace(/#icons#/g, icons);
  const jsPatch = `${src}/icons/Icon/__stand__/IconGrid/IconGrid.tsx`;
  await ensureDir(dirname(jsPatch));
  await writeFile(jsPatch, jsCode);
};

const createFileIconsStories = async (svgComponents, src) => {
  const templatePath = './scripts/templates/FileIconsGallery.tsx.template';
  const template = await readFile(templatePath, 'utf8');

  let imports = '';
  let icons = '';

  Object.keys(svgComponents)
    .sort(sortComponent)
    .forEach(async (componentName) => {
      if (iconFileComponentIsValid(svgComponents[componentName])) {
        imports += `import { ${componentName} } from '../../../${componentName}/${componentName}';\n`;
        icons += `${componentName},\n`;
      }
    });

  const jsCode = template
    .replace(/#imports#/g, imports)
    .replace(/#icons#/g, icons);
  const jsPatch = `${src}/fileIcons/FileIcon/__stand__/FileIconsGallery/FileIconsGallery.tsx`;
  await ensureDir(dirname(jsPatch));
  await writeFile(jsPatch, jsCode);
};

const createComponent = async ({ componentName, pathOutdir, templatePath }) => {
  const template = await readFile(templatePath, 'utf8');
  const jsCode = template.replace(/#componentName#/g, componentName);

  const jsPatch = `${pathOutdir}/${componentName}.tsx`;
  await ensureDir(dirname(jsPatch));
  await writeFile(jsPatch, jsCode);
};

const crateSvgComponentsMap = (sizesPath) => ({
  m: sizesPath.m ? 'M' : sizesPath.s ? 'S' : 'Xs',
  s: sizesPath.s ? 'S' : sizesPath.m ? 'M' : 'Xs',
  xs: sizesPath.xs ? 'Xs' : sizesPath.s ? 'S' : 'M',
});

const createSvgComponent = async ({
  componentName,
  pathOutdir,
  templatePath,
  sizes: sizesProp,
}) => {
  const sizesMap = crateSvgComponentsMap(sizesProp);

  let sizesImports = '';
  if (sizesMap.m === 'M') {
    sizesImports += `import ${componentName}SizeM from './${componentName}_size_m';\n`;
  }
  if (sizesMap.s === 'S') {
    sizesImports += `import ${componentName}SizeS from './${componentName}_size_s';\n`;
  }
  if (sizesMap.xs === 'Xs') {
    sizesImports += `import ${componentName}SizeXs from './${componentName}_size_xs';\n`;
  }

  const template = await readFile(templatePath, 'utf8');
  const jsCode = template
    .replace(/#componentName#/g, componentName)
    .replace(/#sizesImports#/g, sizesImports)
    .replace(/#sizeM#/g, sizesMap.m)
    .replace(/#sizeS#/g, sizesMap.s)
    .replace(/#sizeXs#/g, sizesMap.xs);

  const jsPatch = `${pathOutdir}/${componentName}.tsx`;
  await ensureDir(dirname(jsPatch));
  await writeFile(jsPatch, jsCode);
};

const iconsTransformed = async (ignore, src) => {
  const svgFiles = await fg([`${src}/icons/**/*.svg`], { ignore });
  const test = /.\/src\/icons\/(.+)\/(.+)_size_(.+).svg/;
  const svgComponents = {};

  svgFiles.forEach((fileName) => {
    if (test.test(fileName)) {
      const [file, componentName, svgName, size] = test.exec(fileName);
      if (componentName === svgName) {
        if (!svgComponents[componentName]) {
          svgComponents[componentName] = {};
        }
        svgComponents[componentName][size.toLowerCase()] = file;
      }
    }
  });

  Object.keys(svgComponents).forEach(async (componentName) => {
    const sizes = svgComponents[componentName];

    if (iconComponentIsValid(sizes)) {
      if (sizes.xs) {
        await svgParse({
          componentName: `${componentName}SizeXs`,
          fileName: `${componentName}_size_xs`,
          path: sizes.xs,
          pathOutdir: `./src/icons/${componentName}/`,
          cleanFill: true,
        });
      }
      if (sizes.s) {
        await svgParse({
          componentName: `${componentName}SizeS`,
          fileName: `${componentName}_size_s`,
          path: sizes.s,
          pathOutdir: `./src/icons/${componentName}/`,
          cleanFill: true,
        });
      }
      if (sizes.m) {
        await svgParse({
          componentName: `${componentName}SizeM`,
          fileName: `${componentName}_size_m`,
          path: sizes.m,
          pathOutdir: `./src/icons/${componentName}/`,
          cleanFill: true,
        });
      }
      await createSvgComponent({
        sizes,
        componentName,
        pathOutdir: `./src/icons/${componentName}/`,
        templatePath: './scripts/templates/Icon.js.template',
      });
    }
  });
  await createIconStories(svgComponents, src);
};

const iconsFileTransformed = async (ignore, src) => {
  const svgFiles = await fg([`${src}/fileIcons/**/*.svg`], { ignore });

  const test = /.\/src\/fileIcons\/(.+)\/(.+)_size_(.+).svg/;
  const svgComponents = {};

  svgFiles.forEach((fileName) => {
    if (test.test(fileName)) {
      const [file, componentName, svgName, size] = test.exec(fileName);
      if (componentName === svgName) {
        if (!svgComponents[componentName]) {
          svgComponents[componentName] = {};
        }
        svgComponents[componentName][size.toLowerCase()] = file;
      }
    }
  });

  Object.keys(svgComponents).forEach(async (componentName) => {
    if (iconFileComponentIsValid(svgComponents[componentName])) {
      await svgParse({
        componentName: `${componentName}SizeS`,
        fileName: `${componentName}_size_s`,
        path: svgComponents[componentName].s,
        pathOutdir: `./src/fileIcons/${componentName}/`,
      });
      await svgParse({
        componentName: `${componentName}SizeM`,
        fileName: `${componentName}_size_m`,
        path: svgComponents[componentName].m,
        pathOutdir: `./src/fileIcons/${componentName}/`,
      });
      await createComponent({
        componentName,
        pathOutdir: `./src/fileIcons/${componentName}/`,
        templatePath: './scripts/templates/FileIcon.js.template',
      });
    }
  });
  await createFileIconsStories(svgComponents, src);
};

const responsesImagesTransformed = async (ignore, src) => {
  const svgFiles = await fg([`${src}/responsesImages/**/*.svg`], { ignore });
  const test = /.\/src\/responsesImages\/(.+)\/ResponsesImage(.+).svg/;
  const svgComponents = {};

  svgFiles.forEach((fileName) => {
    if (test.test(fileName)) {
      const [file, componentName, svgName] = test.exec(fileName);
      if (componentName === 'ResponsesImage' + svgName) {
        if (!svgComponents[componentName]) {
          svgComponents[componentName] = {};
        }
        svgComponents[componentName] = file;
      }
    }
  });

  Object.keys(svgComponents).forEach(async (componentName) => {
    await svgParse({
      componentName: `${componentName}`,
      fileName: `${componentName}Svg`,
      path: svgComponents[componentName],
      pathOutdir: `./src/responsesImages/${componentName}/`,
      svgo: false,
      cleanFill: true,
    });
    await createComponent({
      componentName,
      pathOutdir: `./src/responsesImages/${componentName}/`,
      templatePath: './scripts/templates/ResponsesImage.tsx.template',
    });
  });
  // await createFileIconsStories(svgComponents, src);
};

const copyAssets = async (ignore, src, distPaths) => {
  const assetFiles = await fg([`${src}/**/*.{svg,jpg,png,gif,md,woff,woff2}`], {
    ignore,
  });

  assetFiles.forEach(async (fileName) => {
    const asset = await readFile(fileName);
    for (const distPath of distPaths) {
      const newPath = resolve(distPath, relative(src, fileName));
      await ensureDir(dirname(newPath));
      writeFile(newPath, asset);
    }
  });
};

// TODO: make 'components' part of API
// const components = 'components';

// TODO: get it from bem-config
// const platforms = ['common', 'desktop', 'touch-phone', 'touch-pad'];
const platforms = ['common'];

const layerToPlatform = {
  'common': ['common'],
  'desktop': ['desktop'],
  'deskpad': ['touch-pad', 'desktop'],
  'touch': ['touch-phone', 'touch-pad'],
  'touch-pad': ['touch-pad'],
  'touch-phone': ['touch-phone'],
};

const getPackageTemplate = ({ name, version = '0.0.0' }) => `{
  "name": "${name}",
  "version": "${version}",
  "main": "index.js",
  "module": "es.js",
  "sideEffects": [
    "*.css"
  ]
}
`;

const getESMExportTemplate = ({ filePath }) => `export * from "${filePath}";`;
const getCJSExportTemplate = ({ filePath }) =>
  `tslib_1.__exportStar(require("${filePath}"), exports);`;

const indexEsTmpl = (blocks) => blocks.join('\n');

const indexJsTmpl = (blocks) => `"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
${blocks.join('\n')}
`;

const updateGitignore = async (allKeys, gitignorePath) => {
  let gitignore = await readFile(gitignorePath, {
    flag: 'a+',
    encoding: 'utf8',
  });

  gitignore = gitignore.split('\n').map((el) => el.trim());
  let startOfBuildPaths = gitignore.indexOf('# build');
  if (startOfBuildPaths === -1) {
    gitignore.unshift('# build');
    startOfBuildPaths = 0;
  }
  let endOfBuildPaths = gitignore.findIndex(
    (el, index) => index > startOfBuildPaths && el.startsWith('#'),
  );
  if (endOfBuildPaths === -1) {
    endOfBuildPaths = gitignore.indexOf('', startOfBuildPaths + 1);
  }
  if (endOfBuildPaths === -1) {
    endOfBuildPaths = gitignore.length;
  }
  const neededAddEmptyLine =
    endOfBuildPaths < gitignore.length && gitignore[endOfBuildPaths] !== '';
  let buildPaths = gitignore
    .slice(startOfBuildPaths, endOfBuildPaths)
    .filter((el) => el)
    .sort();

  buildPaths = [...buildPaths, ...allKeys.map((k) => `/${k}`)].sort();

  buildPaths = buildPaths.reduce((acc, el) => {
    if (!acc.length || acc[acc.length - 1] !== el) {
      acc.push(el);
    }
    return acc;
  }, []);

  if (neededAddEmptyLine) {
    buildPaths.push('');
  }

  gitignore = [
    ...gitignore.slice(0, startOfBuildPaths),
    ...buildPaths,
    ...gitignore.slice(endOfBuildPaths),
  ];

  await writeFile(gitignorePath, gitignore.join('\n'));
};

const generateReExports = (
  ignore,
  src,
  [distSrc, distEsSrc],
  distPath,
  componentFolder = 'components',
) =>
  fg([join(src, componentFolder, '**')], { ignore }).then(async (files) => {
    const packPath = join(distPath, 'package.json');
    const pack = await readJSON(packPath);
    const components = new Map();

    // Collect components
    files
      .sort()
      .filter((fileName) => fileName.match(/\.tsx?$/))
      .forEach((fileName) => {
        const filePath = fileName.replace(normalize(src), '');
        const entityName = filePath.replace(`/${componentFolder}/`, '');

        const { cell } = nestedModernMatch(entityName);

        if (!cell) {
          // eslint-disable-next-line no-console
          // console.log(logSymbols.warning, 'not exported:', entityName);
          return;
        }

        const { entity, layer, tech } = cell;

        if (tech.match(/^tsx?$/)) {
          if (!components.has(entity.block)) {
            components.set(
              entity.block,
              new Map(platforms.map((p) => [p, new Map()])),
            );
          }
          if (layerToPlatform[layer]) {
            for (const platform of layerToPlatform[layer]) {
              // what we do with elements ?
              if (!entity.elem) {
                components
                  .get(entity.block)
                  .get(platform)
                  .set(entity.id, { filePath });
              }
            }
          }
        }
      });

    // Generate reExports for components
    for (const [componentName, platforms] of components) {
      const blockDir = join(distPath, componentName);

      await remove(blockDir); // how to clean ? we need to store blocks somewhere
      await ensureDir(blockDir);

      for (const [platform, entities] of platforms) {
        const platformDir =
          platform === 'common' ? blockDir : join(blockDir, platform);

        await ensureDir(platformDir);
        await writeFile(
          join(platformDir, 'package.json'),
          getPackageTemplate({
            name: `${pack.name}/${componentName}`,
            version: pack.version,
          }),
        );

        const reExportsES = [];
        const reExportsJS = [];

        // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars,@typescript-eslint/no-unused-vars
        for (const [_, { filePath }] of entities) {
          const exportESMTemplate = getESMExportTemplate({
            filePath: relative(
              join(platformDir, 'index'),
              join(blockDir, distEsSrc, filePath.replace(/\.tsx?$/, '')),
            ),
          });
          const exportCJSTemplate = getCJSExportTemplate({
            filePath: relative(
              join(platformDir, 'index'),
              join(blockDir, distSrc, filePath.replace(/\.tsx?$/, '')),
            ),
          });

          reExportsES.push(exportESMTemplate);
          reExportsJS.push(exportCJSTemplate);
        }

        /*
         * Складываем bundle для платформы, если файл представлен
         */

        const bundleFilesTest = `${src}/${componentFolder}/${componentName}/${componentName}.{ts,tsx}`;
        const bundleFiles = await fg(bundleFilesTest);

        if (bundleFiles.length === 1) {
          const bundleDir = join(platformDir, '');
          await ensureDir(bundleDir);

          const platformPath = bundleFiles[0]
            .replace(/\.tsx?$/, '')
            .replace(`src/${componentFolder}`, componentFolder);
          const cjsFilePath = relative(
            join(bundleDir, 'index'),
            join(blockDir, distSrc, platformPath),
          );
          const esmFilePath = relative(
            join(bundleDir, 'index'),
            join(blockDir, distEsSrc, platformPath),
          );

          const bundleCJS = [];
          const bundleESM = [];

          bundleCJS.push(
            getCJSExportTemplate({
              filePath: cjsFilePath,
            }),
          );
          writeFile(join(bundleDir, 'index.js'), indexJsTmpl(bundleCJS));

          bundleESM.push(
            getESMExportTemplate({
              filePath: esmFilePath,
            }),
          );
          writeFile(join(bundleDir, 'es.js'), indexEsTmpl(bundleESM));

          writeFile(join(bundleDir, 'index.d.ts'), indexEsTmpl(bundleESM));

          writeFile(
            join(bundleDir, 'package.json'),
            getPackageTemplate({
              name: `${pack.name}/${componentName}`,
              version: pack.version,
            }),
          );
        }
        writeFile(join(platformDir, 'index.js'), indexJsTmpl(reExportsJS));
        writeFile(join(platformDir, 'index.d.ts'), indexEsTmpl(reExportsES));
        writeFile(join(platformDir, 'es.js'), indexEsTmpl(reExportsES));
      }
    }

    // TODO: internal забирать из общего места.
    const newKeys = ['__internal__', 'fonts', ...components.keys()];
    const allKeys = pack.files.concat(newKeys);

    const setKeys = new Set(allKeys.sort());
    pack.files = Array.from(setKeys);

    await writeJSON(packPath, pack, { spaces: 2 });

    const gitignorePath = join(distPath, '.gitignore');
    await updateGitignore(newKeys, gitignorePath);
    // eslint-disable-next-line no-console
    // console.log(logSymbols.success, 'Update', gitignorePath);
  });

module.exports = {
  transformCSS,
  copyAssets,
  generateReExports,
  iconsTransformed,
  copyPackageJson,
  iconsFileTransformed,
  responsesImagesTransformed,
  copyReadme,
  copyChangelog,
  generateReExportsFonts,
};

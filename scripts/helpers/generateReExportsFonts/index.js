const fg = require('fast-glob');
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

const getESMExportTemplate = (reExports) => {
  let str = '';
  reExports.map((filePath) => {
    str += `export * from "../${filePath}";\n`;
  });

  return str;
};

const generateReExportsFonts = (
  ignore,
  src,
  [distSrc, distEsSrc],
  distPath,
  componentFolder = 'fonts',
) => {
  return fg([join(src, componentFolder, '**', 'index.tsx')], { ignore }).then(async (files) => {
    const blockDir = join(distPath, 'fonts');
    const reExports = [];

    files.map((fileName) => {
      const filePath = fileName.replace(normalize(src), '');
      const entityName = filePath.replace(`/${componentFolder}/`, '');
      reExports.push(join(distEsSrc, filePath.replace(/\/index\.tsx?$/, '')));
    });

    await ensureDir(blockDir);

    writeFile(join(blockDir, 'index.d.ts'), getESMExportTemplate(reExports));
    writeFile(join(blockDir, 'index.js'), getESMExportTemplate(reExports));
  });
};

module.exports = {
  generateReExportsFonts,
};

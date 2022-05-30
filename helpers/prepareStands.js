const fg = require('fast-glob');
const {
  readFile,
  writeFile,
  ensureDir,
  remove,
  readJSON,
  writeJSON,
  copyFile,
} = require('fs-extra');

const { access, F_OK } = require('fs');

const createlazyDocs = async (srcWithName, standsImportPath, type) => {
  const docsFile = `${srcWithName}${type}`;
  // lazydocs.tsx.template
  // console.log(lazyDocsFileName);

  const template = await readFile(
    'node_modules/@consta/stand/templates/lazydocs.tsx.template',
    'utf8',
  );

  access(docsFile, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${docsFile.replace(/\W/g, '_')}.tsx`;
      console.log(lazyDocsFileName);

      const imports = `import Docs from '../${standsImportPath}/${docsFile}';\n`;

      const jsCode = template.replace(/#imports#/g, imports);

      await writeFile(`node_modules/@consta/stand/src/stands/lazyDocs/${lazyDocsFileName}`, jsCode);
    }
  });
};

const lazyDocs = async (srcWithName, standsImportPath) => {
  await createlazyDocs(srcWithName, standsImportPath, '.stand.mdx');
  await createlazyDocs(srcWithName, standsImportPath, '.dev.stand.mdx');
  await createlazyDocs(srcWithName, standsImportPath, '.design.stand.mdx');
};

const prepareStands = async ({
  srcPath,
  packagePath,
  projectPath,
  standsTemaplatePath,
  standsPath,
  standsImportPath,
  standsUrlPath,
}) => {
  const path = `${srcPath}/**/*.stand.tsx`;

  const standsFiles = await fg(path);

  console.log(standsFiles);

  const template = await readFile(standsTemaplatePath, 'utf8');

  let imports = '';
  let stands = 'export const standsGenerated: CreatedStand[] = [\n';
  let paths = 'export const pathsGenerated: string[] = [\n';
  let lazyIds = 'export const lazyIds: string[] = [\n';

  standsFiles.forEach(async (fileName, index) => {
    const src = fileName.replace(/.tsx/g, '');
    const srcWithName = fileName.replace(/.stand.tsx/g, '');
    const dir = fileName.replace(/[^\/]+$/g, '');

    imports += `import stand_${index} from '${projectPath}/${src}';\n`;
    stands += `stand_${index},\n`;
    paths += `'${standsImportPath}/${dir}',\n`;
    lazyIds += `'${srcWithName.replace(/\W/g, '_')}',\n`;

    lazyDocs(srcWithName, standsImportPath);
  });

  stands += '];\n';
  paths += '];\n';
  lazyIds += '];\n';

  const jsCode = template
    .replace(/#imports#/g, imports)
    .replace(/#stands#/g, stands)
    .replace(/#paths#/g, paths)
    .replace(/#lazyIds#/g, lazyIds);

  await writeFile(standsPath, jsCode);

  //   const test = /.\/src\/icons\/(.+)\/(.+)_size_(.+).svg/;
  //   const svgComponents = {};

  //   svgFiles.forEach((fileName) => {
  //     if (test.test(fileName)) {
  //       const [file, componentName, svgName, size] = test.exec(fileName);
  //       if (componentName === svgName) {
  //         if (!svgComponents[componentName]) {
  //           svgComponents[componentName] = {};
  //         }
  //         svgComponents[componentName][size.toLowerCase()] = file;
  //       }
  //     }
  //   });

  //   Object.keys(svgComponents).forEach(async (componentName) => {
  //     const sizes = svgComponents[componentName];

  //     if (iconComponentIsValid(sizes)) {
  //       if (sizes.xs) {
  //         await svgParse({
  //           componentName: `${componentName}SizeXs`,
  //           fileName: `${componentName}_size_xs`,
  //           path: sizes.xs,
  //           pathOutdir: `./src/icons/${componentName}/`,
  //           cleanFill: true,
  //         });
  //       }
  //       if (sizes.s) {
  //         await svgParse({
  //           componentName: `${componentName}SizeS`,
  //           fileName: `${componentName}_size_s`,
  //           path: sizes.s,
  //           pathOutdir: `./src/icons/${componentName}/`,
  //           cleanFill: true,
  //         });
  //       }
  //       if (sizes.m) {
  //         await svgParse({
  //           componentName: `${componentName}SizeM`,
  //           fileName: `${componentName}_size_m`,
  //           path: sizes.m,
  //           pathOutdir: `./src/icons/${componentName}/`,
  //           cleanFill: true,
  //         });
  //       }
  //       await createSvgComponent({
  //         sizes,
  //         componentName,
  //         pathOutdir: `./src/icons/${componentName}/`,
  //         templatePath: './builder/templates/Icon.js.template',
  //       });
  //     }
  //   });
  //   await createIconStories(svgComponents, src);
};

module.exports = {
  prepareStands,
};

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

  console.log(template);

  let imports = '';
  let stands = 'export const standsGenerated: CreatedStand[] = [\n';
  let paths = 'export const pathsGenerated: string[] = [\n';

  standsFiles.forEach((fileName, index) => {
    const src = fileName.replace(/.tsx/g, '');

    imports += `import stand_${index} from '${projectPath}/${src}';\n`;
    stands += `stand_${index},\n`;
    paths += `'${standsImportPath}/${src}',\n`;
  });

  stands += '];\n';
  paths += '];\n';

  const jsCode = template
    .replace(/#imports#/g, imports)
    .replace(/#stands#/g, stands)
    .replace(/#paths#/g, paths);

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

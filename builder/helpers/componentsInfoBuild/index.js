const { normalize, dirname, join, relative, resolve } = require('path');
const {
  readFile,
  writeFile,
  ensureDir,
  remove,
  readJSON,
  writeJSON,
  copyFile,
  existsSync,
} = require('fs-extra');
const logSymbols = require('log-symbols');
const fg = require('fast-glob');
const { svgParse } = require('../svgParse');

const infoTest = /<!--info((.*\n)*)-->/;
const folderTest = /.\/src\/components\/(.+)\/__stories__\/(.+).docs.mdx/;

const parseInfo = (stringInfo) => {
  const obj = {};
  stringInfo
    .split('\n')
    .filter((item) => !!item)
    .map((item) => {
      const [name, value] = item.split(':');
      if (name && value) {
        obj[name.trim()] = value.trim();
      }
    });
  return obj;
};

const getInfo = (mdx) => {
  const infoText = infoTest.exec(mdx);
  if (infoText) {
    return parseInfo(infoText[1]);
  }
};

const getSvgPath = (path) => {
  return path.replace('.docs.mdx', '.image.svg');
};

async function processMdxFiles(array) {
  const data = [];
  let imports = '';
  let imageMap = '';

  for (const path of array) {
    if (folderTest.test(path)) {
      const [file, componentName] = folderTest.exec(path);
      const mdx = await readFile(path, 'utf8');
      const info = getInfo(mdx);

      if (!info) {
        continue;
      }

      data.push({
        name: componentName,
        url: `/?path=/docs/components-${componentName.toLowerCase()}--playground`,
        ...info,
      });

      const svgPath = getSvgPath(path);

      if (!existsSync(svgPath)) {
        continue;
      }

      const imageComponentName = `${componentName}Image`;

      await svgParse({
        componentName,
        path: svgPath,
        pathOutdir: `./src/uiKit/components/ComponentsGridWithData/data/images/`,
        fileName: imageComponentName,
        svgo: true,
      });

      imports += `import ${imageComponentName} from './images/${imageComponentName}';\n`;
      imageMap += `${componentName}: ${imageComponentName},\n`;

      // const svg = await readFile(svgPath, 'utf8');

      // console.log(svg);
    }
  }

  return { data, imports, imageMap };
}

const componentsInfoBuild = async (src) => {
  console.log(src);
  const mdxFiles = await fg([`${src}/components/**/*.mdx`]);

  const { data, imports, imageMap } = await processMdxFiles(mdxFiles);

  const template = await readFile('./builder/templates/componentsData.ts.template', 'utf8');
  const jsCode = template
    .replace(/#data#/g, JSON.stringify(data))
    .replace(/#imports#/g, imports)
    .replace(/#imageMap#/g, imageMap);

  const jsPatch = `${src}/uiKit/components/ComponentsGridWithData/data/data.ts`;
  await ensureDir(dirname(jsPatch));
  await writeFile(jsPatch, jsCode);
};

module.exports = {
  componentsInfoBuild,
};

// этот скрипт собирает иконки из src/icon/svg, собирает компоненты в src/icon/components
// и апдейтит src/icon/Icon.jsx

const fs = require('fs');
const path = require('path');
const SVGO = require('svgo');

const IMPORT_FILE_TYPE = 'svg';
const EXPORT_FILE_TYPE = 'js';
const IMPORT_FOLDER_PATH = '../components/Icon/svg';
const EXPORT_FOLDER_PATH = '../components/Icon/components';
const WRAPPER_PATH = '../components/Icon/';
const WRAPPER_NAME = 'Icon.jsx';
const FILL_VAR = ' fill={`${currentColor}`}';
const SIZE_XS = '12';
const SIZE_S = '16';
const SIZE_M = '24';

const COMPONENT_TEMPLATE = cases => {
  return (
    'import React from "react";\n' +
    'const SVG = props => {\n' +
    '  switch (props.size) {\n' +
    `   ${cases}` +
    '  }\n' +
    '};\n' +
    'export default SVG;\n'
  );
};

const COMPONENT_CASE = (iconSize, svgCode) => {
  return `    case '${iconSize}':\n` + '      return (\n' + `        ${svgCode}\n` + '      );\n';
};

const WRAPPER_CASE = name => {
  let nameToLowerCase = name.charAt(0).toLowerCase() + name.slice(1);
  return `case "${nameToLowerCase}":\n` + ` return <${name} {...props} />;\n`;
};

const WRAPPER_IMPORT = nameUppercase => {
  return `import ${nameUppercase} from './components/${nameUppercase}';\n`;
};

const WRAPPER_TEMPLATE = (imports, cases) => {
  return (
    `import React from "react";\n` +
    `${imports}\n` +
    `const Icon = props => {\n` +
    `switch (props.name) {\n` +
    `${cases}\n` +
    `default:\n` +
    `return;\n` +
    `}\n` +
    `};\n` +
    `export default Icon;\n`
  );
};

svgo = new SVGO({
  plugins: [
    { cleanupAttrs: true },
    { removeDoctype: true },
    { removeXMLNS: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: true },
    { cleanupEnableBackground: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { moveElemsAttrsToGroup: true },
    { collapseGroups: true },
    { removeRasterImages: true },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { removeAttrs: { attrs: '(stroke|fill|fill-rule|clip-rule)' } },
  ],
});

const getComponentName = arr => {
  const helperMap = {};
  const result = [];
  const bufArr = [];
  // вытаскивает имя без _
  for (let i = 0; i < arr.length; i++) {
    let line = arr[i].split(/(_.*-)/)[1];
    bufArr.push(line.slice(1, -1));
  }
  // удаляет дубликаты
  for (let i = 0; i < bufArr.length; i++) {
    const item = bufArr[i].charAt(0).toUpperCase() + bufArr[i].slice(1);
    if (!helperMap[item]) {
      result[result.length] = item;
      helperMap[item] = true;
    }
  }
  return result;
};

String.prototype.toCamelCase = function() {
  return this.split('-')
    .map(function(item) {
      // return index !== 0
      return item.charAt(0).toUpperCase() + item.substr(1);
      // ? item.charAt(0).toUpperCase() + item.substr(1)
      // : item.charAt(0).toLowerCase() + item.substr(1);
    })
    .join('');
};

function insert(str) {
  return str.substr(0, 4) + FILL_VAR + str.substr(4);
}

fs.readdir(IMPORT_FOLDER_PATH, function(err, fileNames) {
  if (err) {
    return console.log(err);
  }
  let requiredFileNames = [];
  fileNames.forEach(fileName => {
    let fullPath = path.join(IMPORT_FOLDER_PATH, fileName);
    path.extname(fullPath) === '.' + IMPORT_FILE_TYPE ? requiredFileNames.push(fileName) : '';
  });

  // console.log('requiredFileNames ', requiredFileNames);
  let componentNames = getComponentName(requiredFileNames);
  // console.log('componentNames ', componentNames);

  let wrapImports = [];
  let wrapCases = [];
  componentNames.forEach(name => {
    // let fixed = name.replace(/-/g,'')
    let fixed = name.toCamelCase();
    wrapImports.push(WRAPPER_IMPORT(fixed));
    wrapCases.push(WRAPPER_CASE(fixed));
  });
  let wrapperData = WRAPPER_TEMPLATE(wrapImports.join(''), wrapCases.join(''));
  fs.writeFile(path.join(WRAPPER_PATH, WRAPPER_NAME), wrapperData, err => {
    if (err) throw err;
  });

  for (let i = 0; i < componentNames.length; i++) {
    let fileNamesSeparated = [];
    let arr = [];

    // console.log('componentNames[i]', componentNames[i]);

    requiredFileNames.forEach(rFileName => {
      let line = rFileName.split(/(_.*-)/)[1].slice(1, -1);
      line === componentNames[i].toLowerCase() ? fileNamesSeparated.push(rFileName) : '';
      // rFileName.includes(componentNames[i].toLowerCase()) ? fileNamesSeparated.push(rFileName) : ''
    });
    // console.log('fileNamesSeparated ', fileNamesSeparated);

    let requiredSVGData = [];
    fileNamesSeparated.forEach(fileName => {
      let fullImportPath = path.join(IMPORT_FOLDER_PATH, fileName);
      let svgData = fs.readFileSync(fullImportPath, 'utf8', 'string');
      requiredSVGData.push(svgData);
    });
    // console.log(requiredSVGData.length, fileNamesSeparated.length);

    for (let j = 0; j < fileNamesSeparated.length; j++) {
      svgo
        .optimize(requiredSVGData[j])
        .then(function(result) {
          let inserted = insert(result.data);
          switch (result.info.width) {
            case SIZE_M:
              arr.push(COMPONENT_CASE('m', inserted));
              break;
            case SIZE_S:
              arr.push(COMPONENT_CASE('s', inserted));
              break;
            case SIZE_XS:
              arr.push(COMPONENT_CASE('xs', inserted));
              break;
          }
          return arr;
        })
        .then(function(arr) {
          if (j === fileNamesSeparated.length - 1) {
            let fullExportPath = [
              EXPORT_FOLDER_PATH,
              '/',
              componentNames[i].toCamelCase(),
              '.',
              EXPORT_FILE_TYPE,
            ].join('');
            let data = COMPONENT_TEMPLATE(arr.join(''));
            fs.writeFile(fullExportPath, data, err => {
              if (err) throw err;
            });
          }
        });
    }
  }
});

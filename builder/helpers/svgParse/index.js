const { dirname } = require('path');
const { readFile, writeFile, ensureDir } = require('fs-extra');
const svgr = require('@svgr/core').default;

const svgFillRegexp = /(fill|FILL)=\"[a-zA-Z0-9#_.-]*\"/gm;

const svgCleanFill = (svg) => svg.replace(svgFillRegexp, '');

const svgParse = async ({ componentName, path, pathOutdir, fileName, cleanFill, svgo = true }) => {
  let svg = await readFile(path, 'utf8');

  if (cleanFill) {
    svg = svgCleanFill(svg);
  }

  const jsCode = await svgr(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      typescript: true,
      dimensions: false,
      svgo,
      svgoConfig: {
        plugins: [
          {
            prefixIds: {
              prefix: `Svg${fileName}`,
            },
          },
          { cleanupIDs: false },
        ],
      },
    },
    { componentName },
  );

  const jsPatch = `${pathOutdir}/${fileName}.tsx`;
  await ensureDir(dirname(jsPatch));
  await writeFile(jsPatch, jsCode);
};

module.exports = {
  svgParse,
};

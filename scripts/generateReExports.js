const { normalize, resolve, join } = require('path');
const { writeFile, ensureDir, remove } = require('fs-extra');
const { existsSync } = require('fs');
const { Command, flags } = require('@oclif/command');
const logSymbols = require('log-symbols');

const fg = require('fast-glob');
const { react } = require('@bem/sdk.naming.presets');
const createMatch = require('@bem/sdk.naming.cell.match');

const enhancedReactNaming = {
  ...react,
  wordPattern: '[a-zA-Z0-9-]+',
};

const nestedModernMatch = createMatch(enhancedReactNaming);
const INTERNAL_PREFIX = '__internal__';

const getESMExportTemplate = ({ filePath }) => `export * from "${filePath}";`;

const generateReExport = async (src, reexport, ignore, distPath) => {
  const distSrc = join(INTERNAL_PREFIX, 'src');

  const components = [];

  const files = await fg(join(src, reexport, '**/*.{ts,tsx}'), { ignore });

  // console.log(files);

  files
    .sort()
    .filter((fileName) => fileName.match(/\.(ts|tsx)?$/))
    .forEach((fileName) => {
      const filePath = fileName.replace(normalize(src), '');
      const entityName = filePath.replace(`${reexport}/`, '');

      const { cell } = nestedModernMatch(entityName);

      if (!cell) {
        return;
      }

      if (
        cell.tech.match(/^(ts|tsx)?$/) &&
        !components.find((item) => item === cell.entity.block)
      ) {
        components.push(cell.entity.block);
      }
    });

  for (const componentName of components) {
    const blockDir = join(reexport, componentName);
    const distDir = join(distPath, componentName);

    // console.log(componentName);
    // console.log(blockDir);

    // скрипт для солздания index.ts для всех компонентов

    // const exporte = getESMExportTemplate({
    //   filePath: `./${componentName}`,
    // });

    // writeFile(join(src, blockDir, 'index.ts'), exporte);

    if (!existsSync(join(src, blockDir, 'index.ts'))) {
      continue;
    }

    const exportESMFile = getESMExportTemplate({
      filePath: join('..', distSrc, blockDir),
    });

    // eslint-disable-next-line no-await-in-loop
    await remove(distDir);
    // eslint-disable-next-line no-await-in-loop
    await ensureDir(distDir);

    writeFile(join(distDir, 'index.js'), exportESMFile);
    writeFile(join(distDir, 'index.d.ts'), exportESMFile);
  }
};

const generateReExports = async ({ reexports, src, ignore, distPath }) => {
  await Promise.all(
    reexports.map((reexport) =>
      generateReExport(src, reexport, ignore, distPath),
    ),
  );
};

class GenerateCommand extends Command {
  async safeInvokeHook(hook) {
    if (hook !== undefined) {
      if (typeof hook === 'function') {
        this.log(`start executing ${hook.name}`);
        await hook();
        this.log(`finish executing ${hook.name}`);
      } else {
        this.error(`${hook.name} should be function!`);
      }
    }
  }

  async run() {
    const hrstart = process.hrtime();
    const { flags } = this.parse(GenerateCommand);
    const configPath = resolve(flags.config);
    let config = {};

    try {
      /*eslint-disable */
      config = require(configPath);
      /* eslint-enable */
    } catch (error) {
      this.error(`Can't load build config ${configPath}.`);
    }

    try {
      await Promise.all([
        generateReExports(config).then(() =>
          this.log(logSymbols.success, 'reExports generated'),
        ),
      ]);
    } catch (err) {
      this.error(err);
    }

    const hrend = process.hrtime(hrstart);

    this.log(
      logSymbols.success,
      `${process.env.npm_package_name} - pre-build finished!🔧💥`,
    );
    this.log(`Execution time: ${hrend[0]}s`);
  }
}

GenerateCommand.flags = {
  config: flags.string({
    description: 'The path to a build config file.',
    default: '.build.config.js',
  }),
};

GenerateCommand.description = 'Generate ts dist package...';

GenerateCommand.run();

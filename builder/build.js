const { join, resolve } = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const { Command, flags } = require('@oclif/command');
const logSymbols = require('log-symbols');
const { remove, ensureDir } = require('fs-extra');

const {
  transformCSS,
  generateReExports,
  copyAssets,
  copyPackageJson,
  copyReadme,
  copyChangelog,
} = require('./helpers');

const execAsync = promisify(exec);
const INTERNAL_PREFIX = '__internal__';
const srcPrefix = 'cjs-';

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
      config = require(configPath);
    } catch (error) {
      this.error(`Can't load build config ${configPath}.`);
    }

    const {
      distPath,
      srcPath,
      tsconfig,
      ignore = [],
      namespace,
      naming = 'react',
      // TODO: В будущем использовать postcss как путь до конфига,
      // а не сам конфиг, чтобы иметь возможность повторно использовать конфиг.
      postcss,
      beforeBuild,
      afterBuild,
    } = config;

    const esSrc = join(INTERNAL_PREFIX, 'src');
    const distEsSrc = join(distPath, esSrc);

    const jsSrc = join(INTERNAL_PREFIX, `${srcPrefix}src`);
    const distSrc = join(distPath, jsSrc);

    const srcDir = join(distPath, INTERNAL_PREFIX);

    // TODO: separate command: clean?
    await remove(srcDir);
    // Создаем папку чтобы не было race-conditional при параллельном запуске tsc.
    await ensureDir(srcDir);
    await this.safeInvokeHook(beforeBuild);

    this.log('starting to compile ts to js with esm');
    this.log('starting to compile ts to js with commonJS');
    try {
      await Promise.all([
        execAsync(
          `npx tsc -p ${tsconfig} --module es6 --project build.tsconfig.json  --outDir ${distEsSrc}`,
        ),
        execAsync(
          `npx tsc -p ${tsconfig} --module commonjs --project build.tsconfig.json --outDir  ${distSrc}`,
        ),
      ]);
    } catch (err) {
      console.error(err.stdout.toString());
      console.error(err.stderr.toString());
      this.error('TS failed to compile');
    }
    this.log(logSymbols.success, 'TS compiled');
    this.log(logSymbols.success, 'ES-Modules compiled to commonJS');

    try {
      await copyPackageJson(distPath);
      await copyReadme(distPath);
      await copyChangelog(distPath);
      await Promise.all([
        transformCSS(ignore, srcPath, [distSrc, distEsSrc], {
          namespace,
          naming,
          postcss,
        }).then(() => this.log(logSymbols.success, 'css copied & transformed')),
        copyAssets(ignore, srcPath, [distSrc, distEsSrc]).then(() =>
          this.log(logSymbols.success, 'svg & png copied'),
        ),
      ]);
      await generateReExports(ignore, srcPath, [jsSrc, esSrc], distPath).then(() =>
        this.log(logSymbols.success, 'components reExports generated!'),
      );
      await generateReExports(ignore, srcPath, [jsSrc, esSrc], distPath, 'mixs').then(() =>
        this.log(logSymbols.success, 'mixs reExports generated!'),
      );
      await generateReExports(ignore, srcPath, [jsSrc, esSrc], distPath, 'hooks').then(() =>
        this.log(logSymbols.success, 'hooks reExports generated!'),
      );
      await generateReExports(ignore, srcPath, [jsSrc, esSrc], distPath, 'hocs').then(() =>
        this.log(logSymbols.success, 'НОСs reExports generated!'),
      );
      await generateReExports(ignore, srcPath, [jsSrc, esSrc], distPath, 'icons').then(() =>
        this.log(logSymbols.success, 'icons reExports generated!'),
      );
      await generateReExports(ignore, srcPath, [jsSrc, esSrc], distPath, 'fileIcons').then(() =>
        this.log(logSymbols.success, 'fileIcons reExports generated!'),
      );
      await generateReExports(
        ignore,
        srcPath,
        [jsSrc, esSrc],
        distPath,
        'responsesImages',
      ).then(() => this.log(logSymbols.success, 'responsesImages reExports generated!'));
      await this.safeInvokeHook(afterBuild);
    } catch (err) {
      this.error(err);
    }

    const hrend = process.hrtime(hrstart);

    this.log(logSymbols.success, `${process.env.npm_package_name} generated!📦💥`);
    this.log(`Execution time: ${hrend[0]}s`);
  }
}

GenerateCommand.flags = {
  config: flags.string({
    description: 'The path to a build config file.',
    default: '.build.config.js',
  }),
};

GenerateCommand.description = 'Generate ts dist package';

GenerateCommand.run();

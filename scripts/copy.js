const { copy } = require('fs-extra');

const { Command, flags } = require('@oclif/command');
const logSymbols = require('log-symbols');
const { remove } = require('fs-extra');

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

    try {
      await copy(flags.src, flags.dest, {
        recursive: !!flags.recursive,
        overwrite: !!flags.overwrite,
      });
    } catch (err) {
      this.error(err);
    }

    const hrend = process.hrtime(hrstart);

    this.log(logSymbols.success, `${flags.src} is copied!`);
    this.log(`Execution time: ${hrend[0]}s`);
  }
}

GenerateCommand.flags = {
  src: flags.string(),
  dest: flags.string(),
  recursive: flags.boolean(),
  overwrite: flags.boolean(),
};

GenerateCommand.description = 'removing file...';

GenerateCommand.run();

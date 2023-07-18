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
      await remove(flags.path);
    } catch (err) {
      this.error(err);
    }

    const hrend = process.hrtime(hrstart);

    this.log(logSymbols.success, `${flags.path} is removed!🗑️`);
    this.log(`Execution time: ${hrend[0]}s`);
  }
}

GenerateCommand.flags = {
  path: flags.string({
    description: 'The path to a build config file.',
    default: undefined,
  }),
};

GenerateCommand.description = 'removing file...';

GenerateCommand.run();

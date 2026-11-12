const { copy } = require('fs-extra');

const postBuildCopyFiles = async () => {
  await copy('./README.md', './dist/README.md');
  // await copy('./dist/ts', './dist/__internal__/src');
  // await remove('./dist/ts');
};

postBuildCopyFiles();

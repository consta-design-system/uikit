const { copy } = require('fs-extra');

const postBuildCopyFiles = async () => {
  await copy('./README.md', './dist/README.md');
};

postBuildCopyFiles();

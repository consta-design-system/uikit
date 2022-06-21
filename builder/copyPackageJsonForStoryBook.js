const { ensureDir, readJSON, writeJSON } = require('fs-extra');
const { dirname } = require('path');
const copyPackageJson = async () => {
  const outPaths = 'build/package.json';
  const pack = await readJSON('package.json');

  let package = {};

  package.name = `@gpn-design/${pack.name.replace(/@/g, '').replace(/\W|_/g, '-')}-stand`;
  package.version = pack.version;
  package.publishConfig = {
    access: 'public',
  };

  await ensureDir(dirname(outPaths));
  await writeJSON(outPaths, package, { spaces: 2 });
};

copyPackageJson();

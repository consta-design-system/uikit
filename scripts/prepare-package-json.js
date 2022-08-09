const fs = require('fs');

function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

const packageJson = JSON.parse(fs.readFileSync('package.json'));

const libPackageJson = omit(packageJson, [
  'scripts',
  'browserslist',
  'husky',
  'lint-staged',
  'devDependencies',
  'engines',
  'config',
]);

fs.writeFileSync('dist/package.json', JSON.stringify(libPackageJson, null, 2));

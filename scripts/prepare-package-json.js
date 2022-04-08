const fs = require('fs');
const _ = require('lodash');

const packageJson = JSON.parse(fs.readFileSync('package.json'));

const libPackageJson = _.omit(packageJson, [
  'scripts',
  'browserslist',
  'husky',
  'lint-staged',
  'devDependencies',
  'engines',
]);

fs.writeFileSync('dist/package.json', JSON.stringify(libPackageJson, null, 2));

const { join: j } = require('path');
const join = (...arg) => j(...arg).replace(/\\/g, '/');

module.exports = {
  join,
};

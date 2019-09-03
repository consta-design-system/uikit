module.exports = config => {
  require('react-app-rewire-postcss')(config, true);

  return config;
};

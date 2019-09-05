/* eslint-disable global-require */
module.exports = {
  presets: [
    [
      require('@babel/preset-env'),
      {
        modules: false,
      },
    ],
    require('@babel/preset-react'),
  ],
  plugins: [
    [require('@babel/plugin-proposal-optional-chaining'), { loose: false }],
    [require('@babel/plugin-proposal-pipeline-operator'), { proposal: 'minimal' }],
    [require('@babel/plugin-proposal-nullish-coalescing-operator'), { loose: false }],
    require('@babel/plugin-proposal-do-expressions'),
    [require('@babel/plugin-proposal-decorators'), { legacy: true }],
    [require('@babel/plugin-proposal-class-properties'), { loose: false }],
  ],
  env: {
    test: {
      presets: [require('@babel/preset-env'), require('@babel/preset-react')],
    },
  },
};

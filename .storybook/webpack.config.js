module.exports = async ({ config }) => {
  // Remove the existing css rule
  config.module.rules = config.module.rules.filter((f) => f.test.toString() !== '/\\.css$/');
  // config.module.rules = config.module.rules.filter((f) => f.test.toString().indexOf('svg') === -1);

  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'css-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'postcss-loader',
        options: { sourceMap: true },
      },
    ],
  });

  config.module.rules.push({
    test: /\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          // compilers: [createCompiler({})],
        },
      },
    ],
  });

  return config;
};

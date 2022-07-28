const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Allow importing core-js in entrypoint and use browserlist to select polyfills
        useBuiltIns: 'entry',
        // Set the corejs version we are using to avoid warnings in console
        // This will need to change once we upgrade to corejs@3
        corejs: 3,
        // Transform modules to CJS only for jest
        modules: isTest ? 'cjs' : false,
        // Exclude transforms that make all code slower
        exclude: ['transform-typeof-symbol'],
      },
    ],
    [
      '@babel/preset-react',
      {
        // Adds component stack to warning messages
        // Adds __self attribute to JSX which React will use for some warnings
        development: !isProduction,
        // Will use the native built-in instead of trying to polyfill
        // behavior for any plugins that require one.
        useBuiltIns: true,
      },
    ],
    ['@babel/preset-typescript'],
    // [
    //   'babel-preset-minify',
    //   {
    //     builtIns: false,
    //   },
    // ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
    [
      '@babel/plugin-proposal-object-rest-spread',
      {
        useBuiltIns: true,
      },
    ],
    // Polyfills the runtime needed for async/await, generators, and friends
    // https://babeljs.io/docs/en/babel-plugin-transform-runtime
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
      },
    ],
    [
      'babel-plugin-named-asset-import',
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
          },
        },
      },
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        alias: {
          '##': './src',
        },
      },
    ],
    // ...(isProduction
    //   ? [
    //       // Treat React JSX elements as value types and hoist them to the highest scope
    //       // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-constant-elements
    //       '@babel/plugin-transform-react-constant-elements',

    //       // Replaces the React.createElement function with one that is more optimized for production
    //       // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-inline-elements
    //       '@babel/plugin-transform-react-inline-elements',

    //       // Remove unnecessary React propTypes from the production build
    //       // https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types
    //       [
    //         'babel-plugin-transform-react-remove-prop-types',
    //         {
    //           removeImport: true,
    //         },
    //       ],
    //     ]
    //   : ['react-hot-loader/babel']),
  ],
};

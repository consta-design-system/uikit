const isProduction = process.env.NODE_ENV === 'buildProduction';
const isTest = process.env.NODE_ENV === 'test';

module.exports = {
  ignore: isProduction
    ? [
        '**/*.css.d.ts',
        '**/__tests__/*',
        '**/__stories__/*',
        '**/__stand__/*',
        '**/__tests__/*',
        '**/__mocks__/*',
        '**/src/stand/*',
      ]
    : [],
  comments: false,
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
    ...(isProduction
      ? [
          [
            'minify',
            {
              builtIns: false,
            },
          ],
        ]
      : []),
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
    ...(isProduction
      ? [
          [
            'babel-plugin-module-resolver',
            {
              root: ['./'],
              alias: {
                '##': './src',
              },
            },
          ],
        ]
      : []),
  ],
};

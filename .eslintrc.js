module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-env'],
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'jsdoc/newline-after-description': 'off',
    'linebreak-style': 'off',
    'eol-last': 0,
    'require-jsdoc': 'off',
    'object-curly-spacing': 'off',
    'operator-linebreak': 'off',
  },
};

// @ts-check
const tseslint = require('typescript-eslint');
const rootConfig = require('../../eslint.config.js');

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'rnd',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'rnd',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-class-suffix': 'off',
      '@angular-eslint/component-class-suffix': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  }
);

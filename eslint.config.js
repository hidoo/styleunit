import configs from '@hidoo/eslint-config';
import compatibilityConfig from '@hidoo/eslint-config/+compatibility';
import prettierConfig from '@hidoo/eslint-config/+prettier';
import nodeConfig from '@hidoo/eslint-config/+node';
import mochaConfig from '@hidoo/eslint-config/+mocha';

export default [
  ...configs,
  compatibilityConfig,
  prettierConfig,
  {
    files: [
      'src/server/**/*.js',
      'test/util/**/*.js',
      'task/**/*.js',
      '**/*.spec.js',
      '**/*.test.js',
      'config.js',
      'gulpfile.js'
    ],
    ...nodeConfig,
    rules: {
      ...nodeConfig.rules,
      'n/file-extension-in-import': ['error', 'always']
    }
  },

  // for test files
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    ...mochaConfig
  },
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    rules: {
      'max-len': 'off',
      'no-magic-numbers': 'off'
    }
  },

  // for this file
  {
    files: ['eslint.config.js'],
    rules: {
      'import/no-anonymous-default-export': 'off'
    }
  },

  // ignore files
  {
    ignores: ['node_modules/', 'example/build/']
  }
];

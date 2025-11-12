// eslint.config.js (ESLint 9 flat config for Node/Express + Prettier)

import js from '@eslint/js';
import globals from 'globals';
import n from 'eslint-plugin-n';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';

export default [
  // Ignore patterns
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },

  // Project rules
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'commonjs',     // Node/Express codebase
      globals: {
        ...globals.node,
        ...globals.es2024,
      },
    },
    plugins: {
      n,
      import: importPlugin,
      prettier,
    },
    // Base recommended sets
    rules: {
      ...js.configs.recommended.rules,
      // n plugin recommended (no flat export; enable key rules manually if you prefer)
      // Commonly useful n/* rules:
      'n/no-missing-import': 'off',              // adjust if you rely on path aliases
      'n/no-unsupported-features/es-syntax': 'off', // mirrors your old node/* rule off
      'n/no-process-exit': 'off',                // you had this off

      // Your previous customizations (mirrored)
      'spaced-comment': 'off',
      'no-console': 'off',
      'consistent-return': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'no-undef': 'error',
      'prefer-destructuring': ['warn', { object: true, array: false }],
      'no-unused-vars': ['warn', { argsIgnorePattern: 'req|res|next|val' }],

      // Prettier (enforce formatting errors via ESLint)
      'prettier/prettier': 'error',
    },
  },
];

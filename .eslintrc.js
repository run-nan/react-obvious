module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    "jest": true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-hooks',
    '@typescript-eslint',
  ],
  // 0：off, 1: warning, 2: error
  'rules': {
    "indent": [2, 4],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "react/prop-types": 0, // ts will validate the prop types
    "react-hooks/rules-of-hooks": 2,
    "react-hooks/exhaustive-deps": 2
  },
};

module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['node_modules/', '.next/', 'dist/'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    next: {
      rootDir: ['apps/main-app'],
    },
  },
}; 
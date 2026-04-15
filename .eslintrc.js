module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        // Code Quality
        'no-console': 'warn',
        'no-debugger': 'error',
        'no-unused-vars': 'error',
        'no-undef': 'error',

        // Best Practices
        'eqeqeq': 'error',
        'curly': 'error',
        'no-eval': 'error',
        'no-implied-eval': 'error',

        // Style
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],

        // Modern JS
        'prefer-const': 'error',
        'prefer-arrow-callback': 'error',
        'arrow-spacing': 'error',
    },
    globals: {
        // Browser globals
        'window': 'readonly',
        'document': 'readonly',
        'console': 'readonly',
        'alert': 'readonly',
        'confirm': 'readonly',
        'prompt': 'readonly',
    },
};

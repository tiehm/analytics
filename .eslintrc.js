module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
    },
    rules:  {
        'quotes': ['error', 'single'],
        'object-curly-spacing': ["error", "always"],
        'max-len': ["error", { "code": 120, "tabWidth": 4, "ignoreUrls": true, "ignoreStrings": false }],
        'no-unused-vars': ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        'no-console': ["error", { allow: ["warn", "error"] }],
        '@typescript-eslint/explicit-function-return-type': 0
    },
};

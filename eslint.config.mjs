import config from '@iobroker/eslint-config';

export default [
    ...config,
    {
        ignores: [
            '.dev-server/',
            '.vscode/',
            '*.test.js',
            'test/**/*.js',
            'widgets/**',
            '*.config.mjs',
            'admin/words.js',
        ],
    },
    {
        rules: {
            'jsdoc/require-jsdoc': 'off',
        },
    },
];
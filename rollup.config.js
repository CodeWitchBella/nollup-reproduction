let node_resolve = require('rollup-plugin-node-resolve');
let babel = require('rollup-plugin-babel');
let hotcss = require('rollup-plugin-hot-css');
let commonjs = require('rollup-plugin-commonjs-alternate');
let replace = require('rollup-plugin-replace');
let static_files = require('rollup-plugin-static-files');
let terser = require('rollup-plugin-terser').terser;
const ignore = require('rollup-plugin-ignore')

let config = {
    input: './src/main.js',
    output: {
        dir: 'dist',
        format: 'esm',
        entryFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash][extname]'
    },
    plugins: [
        ignore(['ws']),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        hotcss({
            hot: process.env.NODE_ENV === 'development',
            filename: 'styles.css'
        }),
        babel(),
        node_resolve(),
        commonjs({
            namedExports: {
                'node_modules/react/index.js': [
                    'Component'
                ]
            }
        }),
    ]
}

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
        static_files({
            include: ['./public']
        }),
        terser({
            compress: {
                global_defs: {
                    module: false
                }
            }
        })
    ]);
}

module.exports = config;
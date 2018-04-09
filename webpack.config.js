const path = require('path');

const webpack = require('webpack');
const BitwigWebpackPlugin = require('bitwig-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsconfig = require('./tsconfig.json');
const crypto = require('crypto');

const glob = require('glob');

const paths = Array.from(new Set([].concat(...tsconfig.include.map(p => glob.sync(p)))));

const perFileCacheGroups = paths.reduce((result, p, i) => {
    const name = p
        .slice(0, -3)
        .replace(new RegExp(`^${path.join(tsconfig.compilerOptions.rootDir)}`), 'project-files');
    result[`file${i + 1}`] = {
        name,
        test: RegExp(path.join(__dirname, p)),
        chunks: 'initial',
        enforce: true,
    };
    return result;
}, {});

module.exports = (_, { mode }) => ({
    mode,
    entry: {
        'maschine-studio.control': './src/maschine-studio',
        'maschine-mikro.control': './src/maschine-mikro',
    },
    output: { path: path.resolve(__dirname, 'dist'), filename: '[name].js' },
    resolve: {
        extensions: ['.ts', '.js'],
        // allow non relative imports from project root
        modules: [tsconfig.compilerOptions.baseUrl, 'node_modules'],
    },
    // setup typescript loader for ts and js files
    module: {
        rules: [
            {
                test: /\.[tj]s$/,
                loader: 'ts-loader',
                options: {
                    compilerOptions: { checkJs: false }, // don't have build process type check js files
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new BitwigWebpackPlugin(), // enables synchronous code splitting
        new CleanWebpackPlugin(['dist/*'], { verbose: false }),
        new CopyWebpackPlugin([{ from: 'README.md' }]), // non JS things to copy
        new CaseSensitivePathsPlugin(), // catch case sensitivity errors on case insensitive systems
    ],
    optimization: {
        // separate webpack manifest and vendor libs from project code
        splitChunks: {
            cacheGroups: {
                // in dev mode output a chunk per src file to make debugging easier
                ...(mode === 'development' ? perFileCacheGroups : {}),
                vendor: {
                    name: 'vendor.bundle',
                    test: /node_modules/,
                    chunks: 'initial',
                    enforce: true,
                },
            },
        },
        // makes output easy to read for debugging
        concatenateModules: true,
    },
    devtool: false, // sourcemaps not supported in Bitwig's JavaScript engine
    stats: {
        colors: true,
        chunks: false,
        version: false,
        hash: false,
        timings: false,
        modules: false,
        builtAt: false,
        cached: false,
        entrypoints: false,
    },
});

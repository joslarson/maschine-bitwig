const path = require('path');

const webpack = require('webpack');
const BitwigWebpackPlugin = require('bitwig-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const tsconfig = require('./tsconfig.json');

module.exports = {
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
        rules: [{ test: /\.[tj]s$/, use: 'awesome-typescript-loader', exclude: /node_modules/ }],
    },
    plugins: [
        new BitwigWebpackPlugin(), // enables synchronous code splitting
        new CopyWebpackPlugin([{ from: 'README.md' }]), // non JS things to copy
        new CaseSensitivePathsPlugin(), // protects against case sensitive file systems
        new webpack.NamedModulesPlugin(), // makes it easier to debug webpack output
        // new webpack.optimize.ModuleConcatenationPlugin(), // makes webpack output smaller and more readable
        // bundle everything coming from the node_modules folder separately
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs.bundle',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
    ],
    stats: {
        colors: true,
        chunks: false,
        version: false,
        hash: false,
        timings: false,
        modules: false,
    },
    watchOptions: {
        ignored: [/node_modules([\\]+|\/)+(?!taktil([\\]+|\/)+lib)/],
    },
};

const path = require('path');

const webpack = require('webpack');
const BitwigWebpackPlugin = require('bitwig-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = (env = { production: false }) => {
    let plugins = [
        new BitwigWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity }),
        new CopyWebpackPlugin([{ from: 'README.md' }]),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new TsConfigPathsPlugin(),
    ];

    if (env.production) {
        plugins = [
            ...plugins,
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
            new webpack.optimize.UglifyJsPlugin({ comments: false }),
        ];
    } else {
        plugins = [...plugins, new webpack.NamedModulesPlugin(), new CaseSensitivePathsPlugin()];
    }

    return {
        entry: {
            'maschine-studio.control': './src/maschine-studio.control.ts',
            'maschine-mikro.control': './src/maschine-mikro.control.ts',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
        resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
        module: {
            loaders: [
                {
                    test: /\.[tj]s$/,
                    loaders: ['ts-loader'],
                    exclude: /node_modules/,
                },
                { test: /\.json$/, loader: 'json-loader' },
            ],
        },
        plugins: plugins,
        stats: {
            colors: true,
            chunks: false,
            version: false,
            hash: false,
            timings: false,
            modules: false,
        },
    };
};

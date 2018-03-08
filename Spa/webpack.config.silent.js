const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
const bundleOutputDir = './wwwroot';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        entry: {
            silentRenew: ['./silent_renew/index.js']
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: isDevBuild ? '/' :'/app/',
            chunkFilename: '[name].chunk.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './silent_renew/silent_renew.html',
                chunks: ['silentRenew'],
                filename: 'silent_renew.html',
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'silentRenew',
                chunks: ['commons'],
            }),
        ]
    }];
};
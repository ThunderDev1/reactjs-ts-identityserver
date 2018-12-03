const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const bundleOutputDir = './wwwroot';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: false },
        mode: isDevBuild ? 'development' : 'production',
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
        ],
        optimization: {
            splitChunks: {
              cacheGroups: {
                commons: {
                  chunks: "initial",
                  minChunks: 3,
                  name: "silentRenew",
                  enforce: true
                }
              }
            }
          }
    }];
};
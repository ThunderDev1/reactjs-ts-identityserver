/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var glob = require('glob');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  const extractCSS = new MiniCssExtractPlugin({ filename: 'vendor.css' });

  return [{
    mode: isDevBuild ? 'development' : 'production',
    stats: { modules: false },
    resolve: { extensions: ['.js'] },
    module: {
      rules: [
        { test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif)(\?|$)/, use: 'url-loader?limit=100000' },
        {
          test: /\.css(\?|$)/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { minimize: isDevBuild, sourceMap: isDevBuild }
            }
          ]
        }
      ]
    },
    entry: {
      vendor: [
        'domain-task',
        'event-source-polyfill',
        'history',
        'react',
        'react-dom',
        'react-router-dom',
        'react-redux',
        'redux',
        'redux-thunk',
        'react-router-redux',
        'semantic-ui-react',
        'semantic-ui-css/semantic.min.css',
      ].concat(
        glob.sync('./node_modules/semantic-ui-react/dist/es/lib/**.js'),
      ),
    },
    output: {
      path: path.join(__dirname, 'wwwroot', 'dist'),
      publicPath: 'dist/',
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
      extractCSS,
      new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ],
    optimization: {
      minimize: !isDevBuild,
      namedModules: true,
      namedChunks: true
    },
  }]
};

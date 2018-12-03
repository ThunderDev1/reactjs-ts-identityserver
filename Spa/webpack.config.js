/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
  const isDevBuild = !(env && env.prod);
  return [{
    // cache: false,
    mode: isDevBuild ? 'development' : 'production',
    stats: { modules: false },
    entry: { 'main': './ClientApp/boot.tsx' },
    resolve: { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    output: {
      path: path.join(__dirname, './wwwroot/dist'),
      filename: '[name].js',
      publicPath: 'dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, include: /ClientApp/,
          use: [
            {
              loader: 'babel-loader',
              options: { babelrc: false, plugins: ['react-hot-loader/babel'], },
            },
            'awesome-typescript-loader?silent=true', // (or awesome-typescript-loader)
          ]
        },
        { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            'style-loader',
            'css-loader',
            //'postcss-loader',
            {
              loader: require.resolve('postcss-loader'),
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            'sass-loader',
          ]
        }
      ]
    },
    plugins: [
      new CheckerPlugin(),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/dist/vendor-manifest.json')
      })
    ],
    optimization: { minimize: !isDevBuild },
    devtool: isDevBuild ? 'inline-source-map' : 'source-map'
  }]
};

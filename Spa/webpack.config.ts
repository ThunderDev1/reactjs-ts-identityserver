import * as webpack from 'webpack';
import * as HtmlWebPackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.tsx',
    silentRenew: './silentRenew/index.js',
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devServer: {
    // Redirects all 404s to the index page
    // this is needed for the callback page to work in development
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      chunks: ['main'],
    }),
    new HtmlWebPackPlugin({
      template: './silentRenew/silentRenew.html',
      filename: 'silentRenew.html',
      chunks: ['silentRenew'],
    }),
  ],
};

export default config;

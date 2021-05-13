const paths = require('./paths');
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const port = 8080;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      // Styles
      {
        test: /\.(s?css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: require('sass'),
            },
          },
        ],
      },
    ],
  },

  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    clientLogLevel: 'warn',
    overlay: true,
    stats: 'minimal',
    open: true,
    compress: true,
    https: {
      key: fs.readFileSync(path.join(__dirname, 'certificat', 'key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certificat', 'cert.pem')),
  },
    hot: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    port,
  },
});

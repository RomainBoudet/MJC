const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');

module.exports = {
  entry: [
    // SCSS
    paths.src + '/styles/index.scss',
    // JS
    paths.src + '/index.js',
  ],
  output: {
    path: paths.build,
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    crossOriginLoading: 'anonymous',
  },
  resolve: {
    alias: {
      src: paths.src,
      app: paths.src,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: paths.static,
          to: '',
        }
      ],
    }),

    new HtmlWebpackPlugin({
      favicon: paths.assets + '/favicon.ico',
      template: paths.assets + '/index.html',
    }),

    // le plugin ci dessous est a supprimer en cas de probléme de hot reloading // 
    //il vérifit que les CDN envoyé ne sont pas corrompus https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity 
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
  }), 
  ],

  module: {
    rules: [
      //JS
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'fonts/',
        },
      },

      // Images
      {
        test: /\.(ico|gif|png|jpe?g|webp|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: { outputPath: 'images/' },
          },
        ],
      },
    ],
  },
};

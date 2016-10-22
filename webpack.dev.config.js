var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

var config = {
  entry: path.resolve(__dirname, 'app/index.jsx'),
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.svg$/,
        include: [path.resolve(__dirname, 'app', 'images')],
        exclude: [path.resolve(__dirname, 'app', 'images', 'static')],
        loader: 'svg-inline'
      },
      {
        test: /\.(svg|woff|png)$/,
        include: [
          path.resolve(__dirname, 'app', 'images', 'static'),
          path.resolve(__dirname, 'app', 'fonts')
        ],
        loader: 'url',
        query: {
          limit: 100000
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  postcss() {
    return [autoprefixer({browsers: '> 1%'})];
  },
  resolve: {
    root: [
      path.resolve('./app')
    ],
    extensions: ['', '.js', '.jsx', '.scss', '.sass']
  }
}

module.exports = config

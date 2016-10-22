var path = require('path')
var webpack = require('webpack')

var config = {
  entry: path.resolve(__dirname, 'server.js'),
  target: 'node',
  output: {
    path: __dirname,
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2'
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
        loader: 'ignore'
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
        loader: 'ignore',
        query: {
          limit: 1000,
          name: '/static/[hash].[ext]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'babel?presets=es2015!es6-template-string'
      }
    ]
  },
  resolve: {
    root: [
      path.resolve('./app')
    ],
    extensions: ['', '.js', '.jsx', '.scss', '.sass']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}

module.exports = config

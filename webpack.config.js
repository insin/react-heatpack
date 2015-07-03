'use strict'

var path = require('path')
var webpack = require('webpack')

var heatpackModules = path.join(__dirname, 'node_modules')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server'
    // App entry point to be provided as an argument to heatpack
  ],
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.cjsx', '.coffee'],
    // Fall back to find heatpack's dependencies for wepack entry modules above
    fallback: heatpackModules
  },
  resolveLoader: {
    // Resolve loaders from heatpack's dependencies
    modulesDirectories: [heatpackModules],
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'react-hot!babel?stage=0', exclude: /node_modules/},
      {test: /\.cjsx$/, loader: 'react-hot!coffee!cjsx', exclude: /node_modules/},
      {test: /\.coffee$/, loader: 'coffee', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'style!css?-restructuring!autoprefixer'},
      {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192'}
    ]
  }
}

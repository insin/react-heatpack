'use strict'

var path = require('path')
var webpack = require('webpack')

var HEATPACK_MODULES = path.join(__dirname, 'node_modules')
var NODE_MODULES_RE = /node_modules/
var DUMMY_ENTRY_RE = /react-heatpack[\\/]dummy.js$/

// We need to special-case loading the heatpack dummy entry module as it will
// be under global node_modules.
function excludeJS(absPath) {
  if (DUMMY_ENTRY_RE.test(absPath)) {
    return false
  }
  return NODE_MODULES_RE.test(absPath)
}

module.exports = function config(options) {
  return {
    devtool: 'eval',
    entry: [
      'webpack-dev-server/client?http://localhost:' + options.port,
      'webpack/hot/only-dev-server',
      options.entry
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
      alias: options.alias,
      extensions: ['', '.js', '.jsx', '.cjsx', '.coffee'],
      // Resolve webpack dev server entry modules from heatpack's dependencies
      fallback: HEATPACK_MODULES
    },
    resolveLoader: {
      // Resolve loaders from heatpack's dependencies
      modulesDirectories: [HEATPACK_MODULES],
    },
    module: {
      loaders: [
        {test: /\.jsx?$/, loader: 'react-hot!babel?stage=0', exclude: excludeJS},
        {test: /\.cjsx$/, loader: 'react-hot!coffee!cjsx', exclude: NODE_MODULES_RE},
        {test: /\.coffee$/, loader: 'coffee', exclude: NODE_MODULES_RE},
        {test: /\.json$/, loader: 'json'},
        {test: /\.css$/, loader: 'style!css?-restructuring!autoprefixer'},
        {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192'}
      ]
    }
  }
}

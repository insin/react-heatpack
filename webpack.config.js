'use strict'

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var HEATPACK_MODULES = path.join(__dirname, 'node_modules')
var NODE_MODULES_RE = /node_modules/
var DUMMY_ENTRY_RE = /react-heatpack[\\/]dummy.js$/

/**
 * Tries to find a node_modules directory which will be resolved for requires
 * from the working directory.
 */
function findWorkingDirNodeModules() {
  var parts = process.cwd().split(path.sep)
  while (parts.length > 0) {
    var target = path.join(parts.join(path.sep), 'node_modules')
    if (fs.existsSync(target)) {
      return target
    }
    parts.pop()
  }
}

/**
 * We need to special-case exclusion to allow the heatpack dummy entry module to
 * be processed by loaders, as it will be under global node_modules.
 */
function excludeJS(absPath) {
  if (DUMMY_ENTRY_RE.test(absPath)) {
    return false
  }
  return NODE_MODULES_RE.test(absPath)
}

module.exports = function config(options) {
  return {
    devtool: 'cheap-module-eval-source-map',
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
      // If there's a node_modules in scope from where the user ran heatpack, we
      // want to pick up React from it first, so prepend it to the list of
      // directories to resolve modules from.
      root: findWorkingDirNodeModules(),
      extensions: ['', '.js', '.jsx', '.cjsx', '.coffee'],
      // Resolve webpack dev server entry modules from heatpack's dependencies
      fallback: HEATPACK_MODULES,
      alias: options.alias
    },
    resolveLoader: {
      // Always resolve loaders from heatpack's own dependencies
      root: HEATPACK_MODULES
    },
    module: {
      loaders: [
        {test: /\.jsx?$/, loader: 'react-hot!babel?stage=0&optional[]=runtime', exclude: excludeJS},
        {test: /\.cjsx$/, loader: 'react-hot!coffee!cjsx', exclude: NODE_MODULES_RE},
        {test: /\.coffee$/, loader: 'coffee', exclude: NODE_MODULES_RE},
        {test: /\.json$/, loader: 'json'},
        {test: /\.css$/, loader: 'style!css?-minimize!autoprefixer'},
        {test: /\.(gif|jpe?g|png|otf|eot|svg|ttf|woff|woff2).*$/, loader: 'url?limit=8192'}
      ]
    }
  }
}

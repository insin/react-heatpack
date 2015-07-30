var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

module.exports = function server(config, options) {
  new WebpackDevServer(webpack(config), {
    contentBase: __dirname + '/build',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {colors: true}
  }).listen(options.port, 'localhost', function(err) {
    if (err) {
      throw err
    }
    console.log('react-heatpack listening at http://localhost:' + options.port)
  })
}

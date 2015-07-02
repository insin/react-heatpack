var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

module.exports = function server(config) {
  new WebpackDevServer(webpack(config), {
    contentBase: __dirname + '/build',
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(3000, 'localhost', function(err, result) {
    if (err) {
      throw err
    }
    console.log('react-heatpack listening at localhost:3000')
  })
}

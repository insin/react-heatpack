var path = require('path')
var express = require('express')
var webpack = require('webpack')

module.exports = function server(config, options) {
  var app = express()
  var compiler = webpack(config)

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: options.noInfo,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.use(express.static(path.join(__dirname, 'build')))

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'))
  })

  app.listen(options.port, 'localhost', function(err) {
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }
    console.log('react-heatpack listening at http://localhost:' + options.port)
  })
}

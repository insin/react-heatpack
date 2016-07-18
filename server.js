var path = require('path')
var express = require('express')
var webpack = require('webpack')
var fs = require('fs')

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

	// First serve user `public` directory if present
	app.use(express.static(path.join( process.cwd() , 'public')))

  app.use(express.static(path.join(__dirname, 'build')))

	var userCustomIndexFile = path.join( process.cwd(), 'public', 'index.html' );

	app.get('*', function(req, res) {
		if ( ! fs.existsSync( userCustomIndexFile ) ) {
			res.sendFile( path.join(__dirname, 'build/index.html') )
		} else {
			res.sendFile( path.join( userCustomIndexFile ) );
		}
	})

  app.listen(options.port, 'localhost', function(err) {
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }
    console.log('react-heatpack listening at http://localhost:' + options.port)
  })
}

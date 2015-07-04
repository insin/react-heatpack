#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var parseArgs  = require('minimist')

var pkg = require('../package.json')
var config = require('../webpack.config')
var server = require('../server')
var webpack = require('webpack')

var args = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version',
    f: 'force',
    b: 'build'
  }
})

if (args.version) {
  console.log('v' + pkg.version)
  process.exit(0)
}

if (args.help || args._.length === 0) {
  console.log('Usage: heatpack [options] script.js')
  console.log('')
  console.log('Options:')
  console.log('  -f, --force  Force heatpack to run the given script (disables React.render check)')
  console.log('  -b, --build  build')
  process.exit(0)
}

var entryPath = path.join(process.cwd(), args._[0])

if (!args.force) {
  var code = fs.readFileSync(entryPath).toString()
  if (code.indexOf('React.render') === -1) {
    console.log("Couldn't find React.render in " + entryPath + " - assuming it exports a React component.")
    config.resolve.alias = {
      'theydoitonpurposelynn': entryPath
    }
    entryPath = path.join(__dirname, '../dummy.js')
  }
}


if (args.build) {

  config.entry = entryPath
  config.plugins = []
  out = config.output.path = path.join(process.cwd(), 'dist')

  var indexContent = fs.readFileSync(path.join(__dirname, '../build/index-build.html'))
  fs.writeFileSync(path.join(out, 'index.html'), indexContent);

  webpack(config).run(function (err, stats) {
    if (err) {
      console.err(err);
      process.exit(1)
    }
    console.log('Built!')
  });

} else {

  config.entry.push(entryPath)
  server(config)
}


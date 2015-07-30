#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var parseArgs = require('minimist')

var pkg = require('../package.json')
var config = require('../webpack.config')
var server = require('../server')

var args = parseArgs(process.argv.slice(2), {
  alias: {
    f: 'force',
    h: 'help',
    p: 'port',
    v: 'version'
  },
  boolean: ['help', 'force', 'version'],
  default: {
    port: 3000
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
  console.log("  -v, --version print heatpack's version")
  console.log('  -p, --port    port to run the webpack dev server on [default: 3000]')
  console.log('  -f, --force   force heatpack to run the given script (disable React.render check)')
  process.exit(0)
}

var options = {
  alias: {},
  entry: path.resolve(args._[0]),
  port: args.port
}

if (!args.force) {
  var code = fs.readFileSync(options.entry).toString()
  if (code.indexOf('React.render') === -1) {
    options.alias['theydoitonpurposelynn'] = options.entry
    options.entry = path.join(__dirname, '../dummy.js')
  }
}

server(config(options), options)

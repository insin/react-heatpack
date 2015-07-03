#!/usr/bin/env node

var path = require('path')
var parseArgs  = require('minimist')

var pkg = require('../package.json')
var config = require('../webpack.config')
var server = require('../server')

var args = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version'
  }
})

if (args.version) {
  console.log('v' + pkg.version)
  process.exit(0)
}

if (args.help || args._.length === 0) {
  console.log('Usage: heatpack script.js')
  process.exit(0)
}

config.entry.push(path.join(process.cwd(), args._[0]))
server(config)

#!/usr/bin/env node

var path = require('path')
var parseArgs  = require('minimist')

var config = require('../webpack.config')
var server = require('../server')

var args = parseArgs(process.argv.slice(2), {
  alias: {
    h: 'help'
  }
})

if (args.help || args._.length === 0) {
  console.log('Usage: heatpack entry_module')
  console.log('')
  process.exit(0)
}

config.entry.push(path.join(process.cwd(), args._[0]))
server(config)

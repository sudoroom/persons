// The main server script.  This script is run by `npm start`.
// This script shares a lot in common with test/server.js,
// a helper function for starting and shutting down servers
// in tests.

var http = require('http')
var makeHandler = require('./')
var pino = require('pino')

// Read server settings from environment variables.
var DIRECTORY = process.env.DIRECTORY
var PORT = process.env.PORT || 8080
var service = {
  directory: DIRECTORY,
  port: PORT,
  stripe: require('./environment/stripe')
}

// Read metadata from package.json.
var NAME = require('./package.json').name
var VERSION = require('./package.json').version

// Create a logger.
var log = pino({name: NAME + '@' + VERSION})
service.log = log
log.info({event: 'data', directory: DIRECTORY})

// Create an HTTP request handler and server.
var requestHandler = makeHandler(service, log)
var server = http.createServer(requestHandler)

// Trap signals and uncaught exceptions.
process
  .on('SIGTERM', logSignalAndShutDown)
  .on('SIGQUIT', logSignalAndShutDown)
  .on('SIGINT', logSignalAndShutDown)
  .on('uncaughtException', function handleUncaught (exception) {
    log.error(exception)
    shutDown()
  })

function logSignalAndShutDown () {
  log.info({event: 'signal'})
  shutDown()
}

function shutDown () {
  server.close(function onClosed () {
    log.info({event: 'closed server'})
    process.exit()
  })
}

// Start the server listening.
server.listen(PORT, function onListening () {
  var boundPort = this.address().port
  log.info({event: 'listening', port: boundPort})
})

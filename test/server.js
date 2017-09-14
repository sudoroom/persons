// Helper function for starting and shutting down HTTP servers
// for use in tests.

var fs = require('fs')
var http = require('http')
var makeHandler = require('../')
var pino = require('pino')
var rimraf = require('rimraf')

module.exports = function testServer (/* port=0, callback */) {
  var port
  var callback
  if (arguments.length === 2) {
    port = arguments[0]
    callback = arguments[1]
  } else {
    port = 0
    callback = arguments[0]
  }
  // Create a temporary data directory.
  fs.mkdtemp('/tmp/', function (ignore, directory) {
    var settings = {
      directory: directory,
      stripe: require('../environment/stripe')
    }
    // Create a logger.
    var log = pino({}, fs.createWriteStream('test-server.log'))
    settings.log = log
    // Create an HTTP server.
    var server = http.createServer(makeHandler(settings, log))
    // Start listening.
    server.listen(port, function onListening () {
      // Call back with server port, settings, and a function
      // to shut down and clean up.
      callback(this.address().port, settings, function done () {
        // Close the server.
        server.close(function () {
          // Delete the test data directory.
          rimraf.sync(directory)
        })
      })
    })
  })
}

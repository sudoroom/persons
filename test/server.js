var fs = require('fs')
var http = require('http')
var makeHandler = require('../')
var pino = require('pino')
var rimraf = require('rimraf')

module.exports = function testServer () {
  var port
  var callback
  if (arguments.length === 2) {
    port = arguments[0]
    callback = arguments[1]
  } else {
    port = 0
    callback = arguments[0]
  }
  fs.mkdtemp('/tmp/', function withDirectory (ignore, directory) {
    var configuration = {
      directory: directory,
      stripe: require('../environment/stripe')
    }
    var log = pino({}, fs.createWriteStream('test-server.log'))
    configuration.log = log
    var server = http.createServer(makeHandler(configuration, log))
    server.listen(port, function onListening () {
      callback(this.address().port, configuration, function done () {
        server.close(function () {
          rimraf.sync(directory)
        })
      })
    })
  })
}

var fs = require('fs')
var path = require('path')
var parallel = require('run-parallel')
var parseJSON = require('json-parse-errback')
var waterfall = require('run-waterfall')

module.exports = function (settings, callback) {
  var directory = path.join(settings.directory, 'collectives')
  fs.readdir(directory, function (error, entries) {
    if (error) {
      /* istanbul ignore else */
      if (error.code === 'ENOENT') return callback(null, [])
      else return callback(error)
    }
    parallel(entries.map(function (entry) {
      return function (done) {
        var file = path.join(directory, entry, 'collective.json')
        waterfall([fs.readFile.bind(null, file), parseJSON], done)
      }
    }), callback)
  })
}

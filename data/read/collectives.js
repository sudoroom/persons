var fs = require('fs')
var path = require('path')
var parallel = require('run-parallel')
var readJSONFile = require('./json-file')

module.exports = function (settings, callback) {
  var directory = path.join(settings.directory, 'collectives')
  fs.readdir(directory, function (error, entries) {
    if (error) {
      /* istanbul ignore else */
      if (error.code === 'ENOENT') return callback(null, [])
      else return callback(error)
    }
    parallel(entries.map(function (entry) {
      var file = path.join(directory, entry, 'collective.json')
      return readJSONFile.bind(null, file)
    }), callback)
  })
}

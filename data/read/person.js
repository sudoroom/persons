var collectivePath = require('../../paths/person')
var fs = require('fs')
var parseJSON = require('json-parse-errback')
var waterfall = require('run-waterfall')

module.exports = function (settings, id, callback) {
  var file = collectivePath(settings, id)
  waterfall([fs.readFile.bind(null, file), parseJSON], callback)
}

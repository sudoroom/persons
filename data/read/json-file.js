var fs = require('fs')
var parseJSON = require('json-parse-errback')
var waterfall = require('run-waterfall')

module.exports = function (file, callback) {
  waterfall([fs.readFile.bind(null, file), parseJSON], callback)
}

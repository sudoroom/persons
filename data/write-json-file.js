var path = require('path')
var fs = require('fs')
var series = require('run-series')
var mkdirp = require('mkdirp')

module.exports = function (file, data, callback) {
  series([
    mkdirp.bind(null, path.dirname(file)),
    fs.writeFile.bind(null, file, JSON.stringify(data))
  ], callback)
}

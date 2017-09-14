var collectivePath = require('../paths/person')
var readJSONFile = require('./json-file')

module.exports = function (settings, id, callback) {
  readJSONFile(collectivePath(settings, id), callback)
}

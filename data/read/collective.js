var readJSONFile = require('./json-file')
var collectivePath = require('../paths/collective')

module.exports = function (settings, id, callback) {
  readJSONFile(collectivePath(settings, id), callback)
}

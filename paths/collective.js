var path = require('path')
var collectivesPath = require('./collectives')

module.exports = function (settings, id) {
  return path.join(collectivesPath(settings), id, 'collective.json')
}

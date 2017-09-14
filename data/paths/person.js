var path = require('path')
var personsPath = require('./persons')

module.exports = function (settings, id) {
  return path.join(personsPath(settings), id, 'person.json')
}

var path = require('path')

module.exports = function (settings, id) {
  return path.join(settings.directory, 'persons', id, 'person.json')
}

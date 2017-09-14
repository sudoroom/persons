var path = require('path')

module.exports = function (settings) {
  return path.join(settings.directory, 'persons')
}

var htmlEntities = require('html-entities').Html5Entities

module.exports = function escapeHTML (string) {
  return htmlEntities.encodeNonUTF(string)
}

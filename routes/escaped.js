var htmlEntities = require('html-entities').Html5Entities

module.exports = function escaped (string) {
  return htmlEntities.encodeNonUTF(string)
}

var escaped = require('../escaped')
var html = require('../html')

module.exports = function (subtitle) {
  return html`
<head>
  <meta charset=UTF-8>
  <meta name=viewport content="width=725">
  <title>Sudo Persons${subtitle && escaped(' / ' + subtitle)}</title>
  <link rel=stylesheet href=/normalize.css>
  <link rel=stylesheet href=/styles.css>
</head>
  `
}

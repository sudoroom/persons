var doNotCache = require('do-not-cache')
var internalError = require('./internal-error')
var readCollective = require('../data/read/collective')

var escape = require('./escape')
var footer = require('./partials/footer')
var head = require('./partials/head')
var header = require('./partials/header')
var html = require('./html')
var nav = require('./partials/nav')

module.exports = function (request, response, settings) {
  var collectiveID = request.parameters.collective
  readCollective(settings, collectiveID, function (error, collective) {
    /* istanbul ignore if */
    if (error) return internalError(response, error, settings)
    var data = {collective: collective}
    settings.log.info(data, 'data')
    render(data)
  })

  function render (data) {
    doNotCache(response)
    response.setHeader('Content-Type', 'text/html; charset=UTF-8')
    response.end(html`
<!doctype html>
<html lang=EN>
${head()}
<body>
  ${nav()}
  ${header()}
  <main>
    <h2>${escape(data.collective.name)}</h2>
    <p class=description>${escape(data.collective.description)}</p>
  </main>
  ${footer()}
</body>
</html>
  `)
  }
}

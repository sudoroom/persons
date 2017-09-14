var doNotCache = require('do-not-cache')
var internalError = require('./internal-error')
var readCollectives = require('../data/read/collectives')

var escaped = require('./escaped')
var footer = require('./partials/footer')
var sendHTML = require('./send-html')
var head = require('./partials/head')
var header = require('./partials/header')
var html = require('./html')
var nav = require('./partials/nav')

// Export an HTTP request handler.
module.exports = function (request, response, settings) {
  // This route function's structure is typical:
  //
  // 1.  Load data, creating a `data` object.
  // 2   Call `render(data)` to write headers and HTML.
  readCollectives(settings, function (error, collectives) {
    /* istanbul ignore if */
    if (error) return internalError(response, error, settings)
    var data = {collectives: collectives}
    settings.log.info(data, 'data')
    render(data)
  })

  function render (data) {
    doNotCache(response)
    sendHTML(response)
    response.end(html`
<!doctype html>
<html lang=EN>
${head()}
<body>
  ${nav()}
  ${header()}
  <main>
    <h1>Sudo Persons</h1>
    ${data.collectives.map(function (collective) {
      return html`
        <section>
          <h2>${escaped(collective.name)}</h2>
        </section>
      `
    })}
  </main>
  ${footer()}
</body>
</html>
  `)
  }
}

var doNotCache = require('do-not-cache')
var internalError = require('./internal-error')
var readPerson = require('../data/read/person')

var escape = require('./escape')
var footer = require('./partials/footer')
var head = require('./partials/head')
var header = require('./partials/header')
var html = require('./html')
var nav = require('./partials/nav')

module.exports = function (request, response, settings) {
  var personID = request.parameters.person
  readPerson(settings, personID, function (error, person) {
    /* istanbul ignore if */
    if (error) return internalError(response, error, settings)
    var data = {person: person}
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
    <h2>${escape(data.person.id)}</h2>
    ${data.keys.length !== 0 && html`
    <section>
      <h3>E-Mail</h3>
      <p>
        <a href="mailto:${escape(data.email)}">
          ${escape(data.email)}
        </a>
      </p>
    </section>
    <section>
      <h3>Keys</h3>
      <dl>
        ${data.keys.map(function (key) {
          return html`
            <dt>${escape(key.type)}</dt>
            <ddt>${escape(key.key)}</dd>
          `
        })}
      </dt>
    </section>
    `}
  </main>
  ${footer()}
</body>
</html>
  `)
  }
}

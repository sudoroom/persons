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
    var person = data.person
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
    <h2>${escape(person.id)}</h2>
    <section>
      <h3>E-Mail</h3>
      <p>
        <a class=email href="mailto:${escape(person.email)}">
          ${escape(person.email)}
        </a>
      </p>
    </section>
    ${person.keys.length !== 0 && html`
    <section class=keys>
      <h3>Keys</h3>
      <dl>
        ${person.keys.map(function (key) {
          return html`
            <dt class=type>${escape(key.type)}</dt>
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

var footer = require('./partials/footer')
var sendHTML = require('./send-html')
var head = require('./partials/head')
var html = require('./html')
var nav = require('./partials/nav')

module.exports = function (response, error, settings) {
  settings.log.info(error)
  response.statusCode = 500
  sendHTML(response)
  response.end(html`
<!doctype html>
<html lang=en>
${head('Error')}
<body>
  ${nav()}
  <main>
    <h1>Server Error</h2>
    <p>The website ran into an unexpected technical error.</p>
    <p>This is definitely <em>not</em> your fault.</p>
  </main>
  ${footer()}
</body>
</html>
  `)
}

var footer = require('./partials/footer')
var head = require('./partials/head')
var header = require('./partials/header')
var html = require('./html')
var nav = require('./partials/nav')
var sendHTML = require('./send-html')

module.exports = function (service, response, error) {
  service.log.error(error)
  response.statusCode = 404
  sendHTML(response)
  response.end(html`
<!doctype html>
<html>
${head('Not Found')}
<body>
  ${nav()}
  ${header()}
  <main>
    <p class=centered>
      The page you&rsquo;re looking for could not be found.
    </p>
  </main>
  ${footer()}
</body>
</html>
  `)
}

var path = require('path')
var pump = require('pump')
var send = require('send')

var routes = module.exports = require('http-hash')()

routes.set('/', require('./homepage'))

staticFile('normalize.css')
staticFile('styles.css')

function staticFile (file) {
  var filePath = path.join(__dirname, '..', 'static', file)
  routes.set('/' + file, function (request, response) {
    pump(send(request, filePath), response)
  })
}

routes.set('/robots.txt', function (request, response) {
  response.setHeader('Content-Type', 'text/plain')
  response.end([
    'User-Agent: *',
    'Disallow: /'
  ].join('\n'))
})

var internalError = require('./internal-error')
routes.set('/500', function (request, response) {
  internalError(response, new Error('Error for test purposes.'))
})

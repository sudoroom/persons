var notFound = require('./routes/not-found')
var pinoHTTP = require('pino-http')
var routes = require('./routes')
var stripe = require('stripe')
var url = require('url')

module.exports = function makeRequestHandler (settings, log) {
  var pino = pinoHTTP({logger: log})
  settings.stripe.api = stripe(settings.stripe.private)
  return function requestHandler (request, response) {
    pino(request, response)
    var parsed = url.parse(request.url, true)
    request.query = parsed.query
    request.pathname = parsed.pathname
    var route = routes.get(parsed.pathname)
    if (route.handler) {
      request.parameters = route.params
      route.handler(request, response, settings)
    } else {
      notFound(settings, response)
    }
  }
}

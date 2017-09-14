var notFound = require('./routes/not-found')
var pinoHTTP = require('pino-http')
var routes = require('./routes')
var stripe = require('stripe')
var url = require('url')

// Export a function that takes server settings and a logger,
// and returns an HTTP request handler function suitable for
// require('http').createServer().
module.exports = function makeRequestHandler (settings, log) {
  // Wrap the generic pino log with pino-http.
  var pino = pinoHTTP({logger: log})
  // Initialize a Stripe API client using keys from settings.
  settings.stripe.api = stripe(settings.stripe.private)
  return function requestHandler (request, response) {
    // Log each request.
    pino(request, response)
    // Parse parts of the request and set them to properties.
    var parsed = url.parse(request.url, true)
    request.query = parsed.query
    request.pathname = parsed.pathname
    // Route the request by path.
    var route = routes.get(parsed.pathname)
    if (route.handler) {
      request.parameters = route.params
      route.handler(request, response, settings)
    } else {
      notFound(settings, response)
    }
  }
}

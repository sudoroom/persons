// This module exports an http-hash router that maps path names to
// handler function (request, response, settings).

var path = require('path')
var pump = require('pump')
var send = require('send')

var routes = module.exports = require('http-hash')()

routes.set('/', require('./homepage'))
routes.set('/collectives/:collective', require('./collective'))
routes.set('/persons/:person', require('./person'))

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

// A /500 route, simulating an internal error. Useful for revising
// styling, and for for linking, to ask whether users who may have
// seen an error recognize the page.
var internalError = require('./internal-error')
routes.set('/500', function (request, response, settings) {
  internalError(response, new Error('Error for test purposes.'), settings)
})

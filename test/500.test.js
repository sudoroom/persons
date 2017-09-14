var http = require('http')
var server = require('./server')
var tape = require('tape')

tape('GET /500', function (test) {
  server(function (port, configuration, close) {
    http.request({
      port: port,
      path: '/500'
    })
      .once('response', function (response) {
        test.equal(response.statusCode, 500, '500')
        finish()
      })
      .once('error', function (error) {
        test.fail(error, 'no error')
        finish()
      })
      .end()
    function finish () {
      test.end()
      close()
    }
  })
})

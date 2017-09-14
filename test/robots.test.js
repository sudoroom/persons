var http = require('http')
var server = require('./server')
var simpleConcat = require('simple-concat')
var tape = require('tape')

tape('GET /robots.txt', function (test) {
  server(function (port, configuration, close) {
    http.request({port: port, path: '/robots.txt'})
      .once('error', function (error) {
        test.error(error, 'no error')
        finish()
      })
      .once('response', function (response) {
        test.equal(response.statusCode, 200, '200')
        test.equal(
          response.headers['content-type'],
          'text/plain',
          'text/plain'
        )
        simpleConcat(response, function (error, body) {
          test.error(error, 'no body error')
          finish()
        })
      })
      .end()
    function finish () {
      test.end()
      close()
    }
  })
})

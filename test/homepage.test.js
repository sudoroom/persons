var createTestData = require('./create-test-data')
var http = require('http')
var server = require('./server')
var tape = require('tape')

tape('GET /', function (test) {
  server(function (port, settings, close) {
    http.request({port: port, path: '/'})
      .once('error', function (error) {
        test.error(error, 'no error')
        finish()
      })
      .once('response', function (response) {
        test.equal(response.statusCode, 200, '200')
        test.equal(
          response.headers['content-type'],
          'text/html; charset=UTF-8',
          'HTML'
        )
        finish()
      })
      .end()
    function finish () {
      test.end()
      close()
    }
  })
})

tape('GET /', function (test) {
  server(function (port, settings, close) {
    createTestData(settings, function (error) {
      test.ifError(error, 'no error')
      http.request({port: port, path: '/'})
        .once('error', function (error) {
          test.error(error, 'no error')
          finish()
        })
        .once('response', function (response) {
          test.equal(response.statusCode, 200, '200')
          test.equal(
            response.headers['content-type'],
            'text/html; charset=UTF-8',
            'HTML'
          )
          finish()
        })
        .end()
      function finish () {
        test.end()
        close()
      }
    })
  })
})

tape('Browse /', function (test) {
  server(function (port, settings, close) {
    createTestData(settings, function (error) {
      test.ifError(error, 'no error')
      require('./webdriver')
        .url('http://localhost:' + port)
        .waitForExist('body')
        .saveScreenshot('homepage.png')
        .then(function () {
          finish()
        })
        .catch(function (error) {
          test.ifError(error)
          finish()
        })
    })
    function finish () {
      test.end()
      close()
    }
  })
})

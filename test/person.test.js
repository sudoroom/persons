var createTestData = require('./create-test-data')
var server = require('./server')
var tape = require('tape')

tape('Browse /persons/:id', function (test) {
  server(function (port, settings, close) {
    createTestData(settings, function (error) {
      test.ifError(error, 'no error')
      require('./webdriver')
        .url(`http://localhost:${port}/persons/testperson`)
        .waitForExist('body')
        .getText('h2')
        .then(function (text) {
          test.equal(text, 'testperson', 'displays id')
        })
        .getText('.email')
        .then(function (text) {
          test.equal(text, 'john@example.com', 'displays email')
        })
        .getText('.keys .type')
        .then(function (text) {
          test.equal(text, 'SSH', 'displays SSH key')
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

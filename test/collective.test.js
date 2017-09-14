var createTestData = require('./create-test-data')
var server = require('./server')
var tape = require('tape')

tape('Browse /collectives/:id', function (test) {
  server(function (port, settings, close) {
    createTestData(settings, function (error) {
      test.ifError(error, 'no error')
      require('./webdriver')
        .url(`http://localhost:${port}/collectives/testcollective`)
        .waitForExist('body')
        .getText('h2')
        .then(function (text) {
          test.equal(text, 'Test Collective', 'displays name')
        })
        .getText('.description')
        .then(function (text) {
          test.equal(text, 'a test collective', 'description')
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

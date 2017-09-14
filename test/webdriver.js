// A helper module to load and use webdriver to drive Google Chrome.

var spawn = require('child_process').spawn
var path = require('path')
var tape = require('tape')

// Configure tape to shut down webdriver and Chrome when it is done.
tape.onFinish(cleanup)

// Spawn chromedriver as a child process.
var chromedriver = spawn(
  path.join(
    __dirname, '..', 'node_modules', '.bin', 'chromedriver'
  ),
  ['--url-base=/wd/hub']
)

// Create a webdriver client to drive Chrome.
var webdriver = module.exports = require('webdriverio')
  .remote({
    host: 'localhost',
    port: 9515,
    desiredCapabilities: {
      browserName: 'chrome',
      // Use headless flags, unless DISABLE_HEADLESS is set.
      // This is useful for getting a look when a test fails,
      // perhaps with .debug().
      chromeOptions: process.env.DISABLE_HEADLESS
        ? {}
        : {args: ['headless', '--disable-gpu', '--window-size=850,1000']}
    }
  })
  .init()
  .timeouts('script', 1000)
  .timeouts('implicit', 1000)

// Ensure we shut down chromedriver.
process
  .on('SIGTERM', cleanupAndExit)
  .on('SIGQUIT', cleanupAndExit)
  .on('SIGINT', cleanupAndExit)
  .on('uncaughtException', cleanupAndExit)

function cleanup () {
  webdriver.end()
  chromedriver.kill('SIGKILL')
}

function cleanupAndExit () {
  cleanup()
  process.exit(1)
}

webdriver.shutdown = cleanup

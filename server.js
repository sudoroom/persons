var http = require('http')
var makeHandler = require('./')
var pino = require('pino')
var schedule = require('node-schedule')
var billMembers = require('./jobs/bill-members')

var DIRECTORY = process.env.DIRECTORY
var PORT = process.env.PORT || 8080
var service = {
  directory: DIRECTORY,
  port: PORT,
  stripe: require('./environment/stripe')
}

var NAME = require('./package.json').name
var VERSION = require('./package.json').version
var log = pino({name: NAME + '@' + VERSION})
service.log = log

log.info({event: 'data', directory: DIRECTORY})

var requestHandler = makeHandler(service, log)
var server = http.createServer(requestHandler)

process
  .on('SIGTERM', logSignalAndShutDown)
  .on('SIGQUIT', logSignalAndShutDown)
  .on('SIGINT', logSignalAndShutDown)
  .on('uncaughtException', function handleUncaught (exception) {
    log.error(exception)
    shutDown()
  })

server.listen(PORT, function onListening () {
  var boundPort = this.address().port
  log.info({event: 'listening', port: boundPort})
})

var jobs = [billMembers]
jobs.forEach(function (job) {
  job(service, function () { })
  schedule.scheduleJob('0 * * * *', function () {
    job(service, function () { /* pass */ })
  })
})

function logSignalAndShutDown () {
  log.info({event: 'signal'})
  shutDown()
}

function shutDown () {
  server.close(function onClosed () {
    log.info({event: 'closed server'})
    process.exit()
  })
}

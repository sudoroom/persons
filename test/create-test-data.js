var fs = require('fs')
var mkdirp = require('mkdirp')
var parallel = require('run-parallel')
var path = require('path')
var series = require('run-series')

var collectivePath = require('../paths/collective')
var personPath = require('../paths/person')

module.exports = function (settings, callback) {
  var collectiveID = 'testcollective'
  var personID = 'testperson'
  parallel([
    function (done) {
      var file = collectivePath(settings, collectiveID)
      series([
        function (done) {
          mkdirp(path.dirname(file), done)
        },
        function (done) {
          fs.writeFile(file, JSON.stringify({
            id: collectiveID,
            name: 'Test Collective'
          }), done)
        }
      ], done)
    },
    function (done) {
      var file = personPath(settings, personID)
      series([
        function (done) {
          mkdirp(path.dirname(file), done)
        },
        function (done) {
          fs.writeFile(file, JSON.stringify({
            id: personID,
            name: 'John Doe',
            memberships: [
              {
                collective: collectiveID,
                date: new Date().toISOString()
              }
            ]
          }), done)
        }
      ], done)
    }
  ], callback)
}

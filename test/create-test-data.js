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
            name: 'Test Collective',
            description: 'a test collective'
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
            email: 'john@example.com',
            memberships: [
              {
                collective: collectiveID,
                keys: [
                  {
                    type: 'SSH',
                    key: [
                      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB' +
                      'AAABAQDBuW5UoEIU/xo31NIwFbY2QVin' +
                      'Nxxz5po0UO7pBp8sxDcsunjiMKVMFC34' +
                      'E3IPcsJWmdQNnOVqp+/gVvc921Olckhx' +
                      'AQroPev6tyE/S8it5y1YRXSZk9v6Tqif' +
                      'xoE2/2TZm2DHZEfVt3tmcjbxnknPNokp' +
                      'n/XNygg2Vi2CvVMoXwn4MVuRn7r+y41T' +
                      'viSnGrHTq7oXIJfiWUu1/JYb0ehPOQ4/' +
                      'z5fiAe1MpN0arxu2JoMqAE2yUfAX9IIs' +
                      'o9T45PHjCJmsTJ20TPwziVLDGIhK1fvb' +
                      '3HeLwDsM1VD3jh5GJeJA+Ii6awA4exYl' +
                      '0ovPhsaCteZgpSB+BfHZfp9++66V ' +
                      'test@example.com'
                    ].join()
                  }
                ],
                date: new Date().toISOString()
              }
            ]
          }), done)
        }
      ], done)
    }
  ], callback)
}

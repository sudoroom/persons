var parallel = require('run-parallel')
var validateCollective = require('../validate/collective')
var validatePerson = require('../validate/person')
var writeJSONFile = require('../data/write-json-file')

var collectivePath = require('../data/paths/collective')
var personPath = require('../data/paths/person')

var collectiveID = 'testcollective'
var personID = 'testperson'

var collective = {
  id: collectiveID,
  name: 'Test Collective',
  welcome: 'Welcome to Test Collective.'
}

if (!validateCollective(collective)) {
  console.error(validateCollective.errors)
  throw new Error('invalid collective test data')
}

var person = {
  id: personID,
  email: 'john@example.com',
  about: 'a test person',
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
  memberships: [
    {
      collective: collectiveID,
      type: 'comrade',
      date: new Date().toISOString()
    }
  ]
}

if (!validatePerson(person)) {
  console.error(validatePerson.errors)
  throw new Error('invalid person test data')
}

module.exports = function (settings, callback) {
  parallel([
    writeJSONFile.bind(null, collectivePath(settings, collectiveID), collective),
    writeJSONFile.bind(null, personPath(settings, personID), person)
  ], callback)
}

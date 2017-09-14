var AJV = require('ajv')

module.exports = new AJV().compile(require('./schemas/collective'))

var RE = /^[a-z0-9-]{3,16}$/

module.exports = function (argument) {
  return RE.test(argument)
}

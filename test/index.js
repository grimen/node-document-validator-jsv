
var Validator = require('../../node-document-validator');

module.exports = Validator.Spec('JSV', {
  module: require('..'),
  engine: require('JSV').JSV,
  options: {}
});

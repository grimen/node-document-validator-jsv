require('sugar');
var util = require('util');

// HACK: ...until Node.js `require` supports `instanceof` on modules loaded more than once. (bug in Node.js)
var Validator = global.NodeDocumentValidator || (global.NodeDocumentValidator = require('node-document-validator'));

// -----------------------
//  DOCS
// --------------------
//  - https://github.com/kriszyp/json-schema

// -----------------------
//  Constructor
// --------------------

// new JSV ()
// new JSV (options)
function JSV () {
  var self = this;

  self.klass = JSV;
  self.klass.super_.apply(self, arguments);

  self.engine = require('JSV').JSV
}

util.inherits(JSV, Validator);

// -----------------------
//  Class
// --------------------

JSV.defaults = {
  options: {}
};

JSV.options = Object.clone(JSV.defaults.options, true);

JSV.reset = Validator.reset;

// -----------------------
//  Instance
// --------------------

// #validate (attributes)
// #validate (attributes, options)
// #validate (attributes, callback)
// #validate (attributes, options, callback)
JSV.prototype.validate = function() {
  var self = this;

  self._validate(arguments, function(attributes, schema, options, done) {
    var result = self.engine.createEnvironment().validate(attributes, schema);

    var errors = (result.errors || []).length ? result.errors : null;
    var valid = !errors || errors.length === 0;

    done(errors, valid);
  });
};

// -----------------------
//  Export
// --------------------

module.exports = JSV;

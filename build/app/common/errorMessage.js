"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatError = function formatError(attribute, type, message) {
  var errors = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var error = { attribute: attribute, type: type, errors: [message] };
  errors.push(error);
  return errors;
};

exports.default = formatError;
//# sourceMappingURL=errorMessage.js.map
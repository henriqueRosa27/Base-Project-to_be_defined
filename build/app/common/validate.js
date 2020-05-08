"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formatValidationErrors = function formatValidationErrors(errors) {
  var formattedErrors = {
    success: false,
    object: {
      errors: []
    }
  };

  formattedErrors.object.errors = errors.inner.map(function (value) {
    var error = {
      type: value.type,
      attribute: value.path,
      errors: value.errors
    };
    return error;
  });

  return formattedErrors;
};

var validate = async function validate(schema, object) {
  var resultValidation = await schema.validate(object, { abortEarly: false }).then(function (obj) {
    return {
      success: true,
      object: obj
    };
  }).catch(function (err) {
    return formatValidationErrors(err);
  });
  return resultValidation;
};

exports.default = validate;
//# sourceMappingURL=validate.js.map
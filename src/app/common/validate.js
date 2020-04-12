import map from 'lodash/map';

const formatValidationErrors = (errors) => {
  const formattedErrors = {
    success: false,
    object: {
      errors: []
    },
  };

  map(errors.inner, (value) => {
    const error = {
      type : value.type,
      attribute: value.path,
      errors: value.errors
    }
    formattedErrors.object.errors.push(error);
  });

  return formattedErrors;
};

const validate = async (schema, object) => {
  const resultValidation = await schema
    .validate(object, { abortEarly: false })
    .then((obj) => {
      return {
        success: true,
        object: obj
      };
    })
    .catch((err) => {
      return formatValidationErrors(err);
    });
  return resultValidation;
};

export default validate;

import map from 'lodash/map';

const formatValidationErrors = (errors) => {
  const formattedErrors = {
    errors: [],
  };

  map(errors.inner, (value) => {
    const error = {
      type : value.type,
      attribute: value.path,
      errors: value.errors
    }
    formattedErrors.errors.push(error);
  });

  return formattedErrors;
};

const validate = async (schema, object) => {
  const resultValidation = await schema
    .validate(object, { abortEarly: false })
    .then(() => {
      return null;
    })
    .catch((err) => {
      return formatValidationErrors(err);
    });
  return resultValidation;
};

export default validate;

const formatValidationErrors = (errors) => {
  const formattedErrors = {
    success: false,
    object: {
      errors: [],
    },
  };

  formattedErrors.object.errors = errors.inner.map((value) => {
    const error = {
      type: value.type,
      attribute: value.path,
      errors: value.errors,
    };
    return error;
  });

  return formattedErrors;
};

const validate = async (schema, object) => {
  const resultValidation = await schema
    .validate(object, { abortEarly: false })
    .then((obj) => {
      return {
        success: true,
        object: obj,
      };
    })
    .catch((err) => {
      return formatValidationErrors(err);
    });
  return resultValidation;
};

export default validate;

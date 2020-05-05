const formatError = (attribute, type, message, errors = []) => {
  const error = { attribute, type, errors: [message] };
  errors.push(error);
  return errors;
};

export default formatError;

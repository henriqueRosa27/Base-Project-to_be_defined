import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'yup';

const validate = async (
  request: Request,
  response: Response,
  next: NextFunction,
  schema: ObjectSchema
): Promise<void> => {
  try {
    await schema.validate(request.params, {
      abortEarly: false,
    });

    next();
  } catch (error) {
    const array = error.inner.map((err: ValidationError) => ({
      message: err.errors[0],
      label: err.path,
      type: err.type,
    }));
    response.status(400).json({ status: 'error', message: array });
  }
};

export default validate;

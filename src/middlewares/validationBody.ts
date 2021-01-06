import { ObjectSchema, ValidationError } from "yup";
import AppError from "../app/application/errors/AppError";

const validate = async (
  data: Record<string, unknown>,
  schema: ObjectSchema,
): Promise<void> => {
  try {
    await schema.validateAt(data, {
      abortEarly: false,
    });
  } catch (error) {
    console.log("teste");
    const array = error.inner.map((err: ValidationError) => ({
      message: err.errors[0],
      label: err.path,
      type: err.type,
    }));

    const errors = { status: "error", message: array };
    throw new AppError(errors, 400);
  }
};

export default validate;

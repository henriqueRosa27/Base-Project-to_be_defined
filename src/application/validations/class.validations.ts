import * as Yup from 'yup';

export const classValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  topic: Yup.string()
    .required('Campo obrigatório')
    .min(4, 'Minimo de 4 caracteres')
    .max(500, 'Máximo de 500 caracteres'),
});

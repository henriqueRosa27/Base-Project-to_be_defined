import * as Yup from 'yup';

export const loginValidation = Yup.object({
  email: Yup.string()
    .required('Campo obrigatório')
    .email('E-mail inválido')
    .max(100),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'Minimo de 8 caracteres')
    .max(16, 'Máximo de 16 caracteres'),
});

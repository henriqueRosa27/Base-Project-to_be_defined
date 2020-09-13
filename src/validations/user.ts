import * as Yup from 'yup';

const createUserValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(20, 'Máximo de 20 caracteres'),
  surname: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 4 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  email: Yup.string()
    .required('Campo obrigatório')
    .email('E-mail inválido')
    .max(100),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'Minimo de 8 caracteres')
    .max(16, 'Máximo de 16 caracteres'),
});

export default createUserValidation;

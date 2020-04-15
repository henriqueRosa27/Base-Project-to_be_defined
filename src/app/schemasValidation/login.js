import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string('Dado inválido')
    .email('Email invalido')
    .required('Campo obrigtório'),
  password: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(6, 'Campo deve ter entre 6 e 16 caracteres')
    .max(16, 'Campo deve ter entre 6 e 16 caracteres'),
});

export default schema;

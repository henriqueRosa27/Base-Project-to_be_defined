import * as Yup from 'yup';

const schema = Yup.object().shape({
  code: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(4, 'Campo deve ter entre 4 e 20 caracteres')
    .max(20, 'Campo deve ter entre 4 e 20 caracteres'),
});

export default schema;

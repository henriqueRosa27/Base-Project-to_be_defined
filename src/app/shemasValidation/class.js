import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(4, 'Campo deve ter entre 4 e 30 caracteres')
    .max(30, 'Campo deve ter entre 4 e 30 caracteres'),
  topic: Yup.string('Dado inválido')
    .required('Campo obrigtório')
    .min(4, 'Campo deve ter entre 4 e 150 caracteres')
    .max(150, 'Campo deve ter entre 4 e 150 caracteres'),
});

export default schema;

import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(5, 'Campo deve ter entre 5 e 50 caracteres')
    .max(50, 'Campo deve ter entre 5 e 50 caracteres'),
  description: Yup.string('Dado inválido')
    .required('Campo obrigtório')
    .min(5, 'Campo deve ter entre 5 e 500 caracteres')
    .max(500, 'Campo deve ter entre 5 e 500 caracteres'),
  deadline: Yup.date('Dado inválido').required('Campo obrigtório'),
});

export default schema;

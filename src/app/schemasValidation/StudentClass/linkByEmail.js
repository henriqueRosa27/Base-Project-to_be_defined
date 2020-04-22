import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string('Dado inválido')
    .email('Email invalido')
    .required('Campo obrigatório'),
  id_class: Yup.number('Dado inválido').required('Campo obrigatório'),
});

export default schema;

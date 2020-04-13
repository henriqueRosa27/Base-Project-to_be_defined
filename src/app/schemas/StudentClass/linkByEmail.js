import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Campo obrigatório'),
  id_class: Yup.number().required('Campo obrigtório'),
});

export default schema;

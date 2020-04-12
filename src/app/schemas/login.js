import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Campo obrigtório'),
  password: Yup.string().required('Campo obrigtório').min(6),
});

export default schema;

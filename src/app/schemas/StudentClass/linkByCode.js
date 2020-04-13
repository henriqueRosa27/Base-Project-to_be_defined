import * as Yup from 'yup';

const schema = Yup.object().shape({
  code: Yup.string().required('Campo obrigtório'),
});

export default schema;

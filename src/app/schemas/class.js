import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string().required('Campo obrigtório'),
  topic: Yup.string().required('Campo obrigtório'),
});

export default schema;

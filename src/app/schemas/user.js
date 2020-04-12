import * as Yup from 'yup';
import User from '../models/User';

const schema = Yup.object().shape({
  name: Yup.string().required("Campo obrigtório"),
  surname: Yup.string().required("Campo obrigtório"),
  email: Yup.string("Campo obrigtório")
    .email("Email invalido")
    .required()
    .test('unique', 'Email já cadastrado', async (value) => {
      const user = await User.findOne({ where: { email: value } });
      return user === null;
    }),
  password: Yup.string().required("Campo obrigtório").min(6),
});

export default schema;

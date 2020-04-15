import * as Yup from 'yup';

import User from '../models/User';

const schema = Yup.object().shape({
  name: Yup.string('Dado inválido').required('Campo obrigtório'),
  surname: Yup.string('Dado invaálido').required('Campo obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('Campo obrigatório')
    .test('unique', 'Email já cadastrado', async (value) => {
      const user = await User.findOne({ where: { email: value } });
      return user === null;
    }),
  password: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(6, 'Campo deve ter entre 6 e 16 caracteres')
    .max(16, 'Campo deve ter entre 6 e 16 caracteres'),
});

export default schema;

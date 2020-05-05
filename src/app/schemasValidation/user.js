import * as Yup from 'yup';

import User from '../models/User';

const schema = Yup.object().shape({
  name: Yup.string('Dado inválido').required('Campo obrigatório'),
  surname: Yup.string('Dado invaálido').required('Campo obrigatório'),
  email: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .email('Email inválido')
    .test('unique', 'Email já cadastrado', async (value) => {
      if (value) {
        const user = await User.findOne({
          where: { email: value },
          attributes: ['id'],
        });
        return user === null;
      }
      return true;
    }),
  password: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(6, 'Campo deve ter entre 6 e 16 caracteres')
    .max(16, 'Campo deve ter entre 6 e 16 caracteres'),
  confirmPassword: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(6, 'Campo deve ter entre 6 e 16 caracteres')
    .max(16, 'Campo deve ter entre 6 e 16 caracteres')
    .oneOf([Yup.ref('password'), null], 'Senha diferentes'),
});

export default schema;

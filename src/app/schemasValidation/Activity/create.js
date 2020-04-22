import * as Yup from 'yup';
import Class from '../../models/Class';

const schema = Yup.object().shape({
  name: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(5, 'Campo deve ter entre 5 e 50 caracteres')
    .max(50, 'Campo deve ter entre 5 e 50 caracteres'),
  description: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(5, 'Campo deve ter entre 5 e 500 caracteres')
    .max(500, 'Campo deve ter entre 5 e 500 caracteres'),
  deadline: Yup.date('Dado inválido'),
  id_class: Yup.number('Dado inválido')
    .positive('Dado inválido')
    .required('Campo obrigatório')
    .test('classExists', 'Turma não existe', async (value) => {
      if (value) {
        const clas = await Class.findOne({
          where: { id: value },
          attributes: ['id'],
        });
        return clas !== null;
      }
      return true;
    }),
});

export default schema;

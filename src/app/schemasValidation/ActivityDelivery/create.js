import * as Yup from 'yup';
import Activity from '../../models/Activity';

const schema = Yup.object().shape({
  note: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(5, 'Campo deve ter entre 5 e 200 caracteres')
    .max(200, 'Campo deve ter entre 5 e 200 caracteres'),
  report: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(5, 'Campo deve ter no minimo 5'),
  id_activity: Yup.number('Dado inválido')
    .positive('Dado inválido')
    .required('Campo obrigatório')
    .test('classExists', 'Atividade não existe', async (value) => {
      if (value) {
        const activity = await Activity.findOne({
          where: { id: value },
          attributes: ['id'],
        });
        return activity !== null;
      }
      return true;
    }),
});

export default schema;

import * as Yup from 'yup';
import ActivityDelivery from '../../models/ActivityDelivery';

const schema = Yup.object().shape({
  feedback: Yup.string('Dado inválido')
    .required('Campo obrigatório')
    .min(5, 'Campo deve ter entre 5 e 200 caracteres')
    .max(200, 'Campo deve ter entre 5 e 200 caracteres'),
  id_delivery_activity: Yup.number('Dado inválido')
    .positive('Dado inválido')
    .required('Campo obrigatório')
    .test('classExists', 'Resposta de Atividade não existe', async (value) => {
      if (value) {
        const activityDelivery = await ActivityDelivery.findOne({
          where: { id: value },
          attributes: ['id'],
        });
        return activityDelivery !== null;
      }
      return true;
    }),
});

export default schema;

import * as Yup from 'yup';
import { validate } from 'uuid';

const createActivityDeliveryValidation = Yup.object({
  note: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  report: Yup.string()
    .required('Campo obrigatório')
    .min(4, 'Minimo de 4 caracteres'),
  id_activity: Yup.string()
    .required('Campo obrigatório')
    .test('validate-id', 'Id inválido', value => validate(String(value))),
});

const sendFeedbackValidation = Yup.object({
  feedback: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(100, 'Máximo de 50 caracteres'),
});

export { createActivityDeliveryValidation, sendFeedbackValidation };

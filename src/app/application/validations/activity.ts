import * as Yup from 'yup';
import { validate } from 'uuid';

const createActivityValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  description: Yup.string()
    .required('Campo obrigatório')
    .min(4, 'Minimo de 4 caracteres')
    .max(500, 'Máximo de 500 caracteres'),
  deadline: Yup.date().min(new Date(), 'Data mínima inválida'),
  id_class: Yup.string()
    .required('Campo obrigatório')
    .test('validate-id', 'Id inválido', value => validate(String(value))),
});

const updateActivityValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  description: Yup.string()
    .required('Campo obrigatório')
    .min(4, 'Minimo de 4 caracteres')
    .max(500, 'Máximo de 500 caracteres'),
  deadline: Yup.date().min(new Date(), 'Data mínima inválida'),
});

export { createActivityValidation, updateActivityValidation };

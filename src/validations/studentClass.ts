import * as Yup from 'yup';
import { validate } from 'uuid';

const linkByCodeValidation = Yup.object({
  code: Yup.string().required('Campo obrigatório'),
});

const linkByEmailValidation = Yup.object({
  email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
  id_class: Yup.string()
    .required('Campo obrigatório')
    .test('validate-id', 'Id inválido', value => validate(String(value))),
});

export { linkByCodeValidation, linkByEmailValidation };

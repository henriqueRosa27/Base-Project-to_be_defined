import * as Yup from 'yup';
import { validate } from 'uuid';

const idParamValidation = Yup.object({
  id: Yup.string()
    .required('Campo obrigatório')
    .test('validate-param', 'Parâmetro inválido', value =>
      validate(String(value))
    ),
});

export default idParamValidation;

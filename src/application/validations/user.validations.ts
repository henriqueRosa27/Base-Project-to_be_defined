import * as Yup from 'yup';
import { IUserService } from 'src/services/iservices';
import { UserService } from 'src/services/services';
import { UserRepository } from 'src/infrastructure/repositories';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/entities';

export const createUserValidation = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório')
    .min(3, 'Minimo de 3 caracteres')
    .max(20, 'Máximo de 20 caracteres'),
  surname: Yup.string()
    .required('Campo obrigatório')
    .min(4, 'Minimo de 4 caracteres')
    .max(50, 'Máximo de 50 caracteres'),
  email: Yup.string()
    .required('Campo obrigatório')
    .email('E-mail inválido')
    .test('unique', 'E-mail já cadastrado', async value => {
      const userService: IUserService = new UserService(
        new UserRepository(new Repository<UserEntity>()),
      );
      const user = await userService.findByEmail(value);

      return !user;
    })
    .max(100),
  password: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'Minimo de 8 caracteres')
    .max(16, 'Máximo de 16 caracteres'),
  confirm_password: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Senhas diferentes',
  ),
});

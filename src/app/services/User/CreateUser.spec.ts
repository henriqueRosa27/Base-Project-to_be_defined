import * as typeorm from 'typeorm';
import User from '../../models/User';
import UserRepository from '../../repositories/implementations/UserRepository';
import CreateUserService from './CreateUser';
import AppError from '../../../errors/AppError';

(typeorm as any).getRepository = jest.fn();

describe('Create User Service Test', () => {
  it('success', async () => {
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () => Promise.resolve(undefined),
      save: (user: User) => Promise.resolve(user),
    });

    const service = new CreateUserService(
      new UserRepository(typeorm.getRepository(User))
    );

    const userSaved = await service.execute({
      name: 'teste',
      surname: 'teste',
      email: 'teste@teste.com',
      password: '123456789',
    });
    expect(userSaved).not.toBeNull();
  });

  it('error => Email already exists', async () => {
    (typeorm as any).getRepository.mockReturnValue({
      findOne: () =>
        Promise.resolve({
          name: 'teste',
          surname: 'teste',
          email: 'teste@teste.com',
          password: '123456789',
        }),
      save: (user: User) => Promise.resolve(user),
    });

    const service = new CreateUserService(
      new UserRepository(typeorm.getRepository(User))
    );

    const userSaved = async () => {
      await service.execute({
        name: 'teste',
        surname: 'teste',
        email: 'teste@teste.com',
        password: '123456789',
      });
    };

    expect(userSaved).rejects.toThrow(AppError);
  });
});

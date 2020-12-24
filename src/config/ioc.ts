import { Container, decorate, injectable, interfaces } from 'inversify';
import { buildProviderModule, autoProvide } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

import { getRepository } from 'typeorm';
import IUserRepository from '../app/repositories/IUserRepository';
import UserRepository from '../app/repositories/implementations/UserRepository';
import User from '../app/models/User';
import CreateUserService from '../app/services/User/CreateUser';

// Create a new container tsoa can use
const iocContainer = new Container();

decorate(injectable(), Controller); // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule());

// Repositories
iocContainer
  .bind<IUserRepository>('IUserRepository')
  .toDynamicValue(() => new UserRepository(getRepository(User)));

// Services
iocContainer
  .bind<CreateUserService>('CreateUserService')
  .toDynamicValue(
    (context: interfaces.Context) =>
      new CreateUserService(context.container.get('IUserRepository'))
  );

// export according to convention
export { iocContainer, injectable, autoProvide };

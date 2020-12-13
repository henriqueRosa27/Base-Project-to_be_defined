import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule, autoProvide } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

import IUserRepository from '../app/repositories/IUserRepository';
import UserRepository from '../app/repositories/implementations/UserRepository';

// Create a new container tsoa can use
const iocContainer = new Container();

decorate(injectable(), Controller); // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule());

iocContainer.bind<IUserRepository>('IUserRepository').to(UserRepository);

// export according to convention
export { iocContainer, injectable, autoProvide };

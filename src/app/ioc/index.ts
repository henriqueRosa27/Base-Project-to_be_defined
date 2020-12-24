import { Container, decorate, injectable } from "inversify";
import { buildProviderModule, autoProvide } from "inversify-binding-decorators";
import { Controller } from "tsoa";
import { getRepository } from "typeorm";

import { REPOSITORY_TYPES, SERVICE_TYPES } from "./types";
import IUserRepository from "../infra/repositories/IUserRepository";
import UserRepository from "../infra/repositories/implementations/UserRepository";
import User from "../domain/models/User";
import CreateUserService from "../services/User/CreateUser";
import AutenticateUser from "../services/Session/AutenticateUser";

// Create a new container tsoa can use
const iocContainer = new Container();

decorate(injectable(), Controller); // Makes tsoa's Controller injectable

// make inversify aware of inversify-binding-decorators
iocContainer.load(buildProviderModule());

// Repositories
iocContainer.bind<IUserRepository>(REPOSITORY_TYPES.user).to(UserRepository);

// Services
iocContainer
  .bind<CreateUserService>(SERVICE_TYPES.createUser)
  .toDynamicValue(
    () => new CreateUserService(new UserRepository(getRepository(User))),
  );

iocContainer
  .bind<AutenticateUser>(SERVICE_TYPES.sessionLogin)
  .toDynamicValue(
    () => new AutenticateUser(new UserRepository(getRepository(User))),
  );

// export according to convention
export { iocContainer, injectable, autoProvide };

import { Route, Controller, Body, Post } from 'tsoa';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';

import { SERVICE_TYPES as TYPES } from '../../ioc/types';
import { CreateUser } from '../dto/User';
import CreateUserService from '../../services/User/CreateUser';

@provide(UserController)
@Route('user')
export class UserController extends Controller {
  @inject(TYPES.createUser)
  private readonly _createUserService: CreateUserService;

  @Post()
  public async getUser(@Body() body: CreateUser): Promise<any> {
    return this._createUserService.execute(body);
  }
}

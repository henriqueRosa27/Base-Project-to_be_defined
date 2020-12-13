import { Route, Controller, Post, Body } from 'tsoa';
import { provide } from 'inversify-binding-decorators';
import { inject } from 'inversify';
import { CreateUser } from '../dto/User';
import CreateUserService from '../../services/User/CreateUser';

// eslint-disable-next-line no-use-before-define
@provide(UserController)
@Route('user')
// eslint-disable-next-line import/prefer-default-export
export class UserController extends Controller {
  @inject(CreateUserService)
  private readonly createUserService: CreateUserService;

  @Post()
  public async CreateUser(@Body() body: CreateUser): Promise<any> {
    return this.createUserService.execute(body);
  }
}

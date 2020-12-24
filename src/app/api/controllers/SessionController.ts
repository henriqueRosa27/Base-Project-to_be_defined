import { Route, Controller, Post, Body } from "tsoa";
import { provide } from "inversify-binding-decorators";
import { inject } from "inversify";

import { SERVICE_TYPES as TYPES } from "../../ioc/types";
import { Login } from "../../application/dto/Session";
import AutenticateUser from "../../services/Session/AutenticateUser";

@provide(LoginController)
@Route("session")
export class LoginController extends Controller {
  @inject(TYPES.sessionLogin)
  private readonly _autenticateUser: AutenticateUser;

  @Post("login")
  public async Login(@Body() body: Login): Promise<any> {
    return this._autenticateUser.execute(body);
  }
}

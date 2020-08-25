import { Controller, Post, UsePipes, Body, Inject } from '@nestjs/common';
import { IAuthService } from 'src/services/iservices';
import {  LoginDto } from 'src/application/dto';
import { YupValidationPipe } from 'src/application/shared/pipes/validation.pipe';
import { loginValidation } from 'src/application/validations';

@Controller('auth')
export class AuthController {
  constructor(@Inject('IAuthService') private readonly service: IAuthService) {}

  @UsePipes(new YupValidationPipe(loginValidation))
  @Post("/login")
  async login(@Body() dto: LoginDto): Promise<any> {
    return await this.service.login(dto);
  }
}
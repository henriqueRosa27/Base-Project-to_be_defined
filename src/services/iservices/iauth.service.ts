import {  LoginDto } from 'src/application/dto';

export interface IAuthService {
  login(dto: LoginDto): Promise<any>;
}

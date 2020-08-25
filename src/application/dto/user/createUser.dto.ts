import { Exclude } from 'class-transformer';

export class CreateUserDto {
  name: string;

  surname: string;

  email: string;

  password: string;

  @Exclude({ toPlainOnly: true })
  confirm_password: string;
}

import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(4, { message: 'Mínimo de 4 caracteres' })
  @MaxLength(20, { message: 'Máximo de 20 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(4, { message: 'Mínimo de 4 caracteres' })
  @MaxLength(50, { message: 'Máximo de 50 caracteres' })
  surname: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(4, { message: 'Mínimo de 4 caracteres' })
  @MaxLength(100, { message: 'Máximo de 100 caracteres' })
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(8, { message: 'Mínimo de 8 caracteres' })
  @MaxLength(16, { message: 'Máximo de 16 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Campo obrigatório' })
  @MinLength(8, { message: 'Mínimo de 8 caracteres' })
  @MaxLength(16, { message: 'Máximo de 16 caracteres' })
  confirm_password: string;
}

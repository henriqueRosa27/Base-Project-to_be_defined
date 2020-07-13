import { Controller, Post, UsePipes, Body, Get, Inject } from '@nestjs/common';
import { IUserService } from 'src/services/iservices';
import { UserDto, CreateUserDto } from 'src/application/dto';
import { YupValidationPipe } from 'src/application/shared/pipes/validation.pipe';
import { createUserValidation } from 'src/application/validations';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly service: IUserService) {}

  @UsePipes(new YupValidationPipe(createUserValidation))
  @Post()
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return createUserDto;
  }

  @Get()
  async get(): Promise<UserDto[]> {
    return this.service.get();
  }
}

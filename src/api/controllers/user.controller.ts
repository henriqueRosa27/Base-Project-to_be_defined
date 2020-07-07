import { Controller, Post, UsePipes, Body, Get, Inject } from '@nestjs/common';
//import { ValidationPipe } from 'src/application/shared/pipes/validation.pipe';
import { IUserService } from 'src/services/iservices';
import { UserEntity } from 'src/domain/entities';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly service: IUserService) {}

  // @UsePipes(new ValidationPipe())
  // @Post()
  // create(@Body() createUserDto: CreateUserDto): CreateUserDto {
  //   return createUserDto;
  // }

  @Get()
  async get(): Promise<UserEntity[]> {
    return this.service.get();
  }
}

import { Controller, Post, UsePipes, Body, Get, Inject } from '@nestjs/common';
//import { ValidationPipe } from 'src/application/shared/pipes/validation.pipe';
import { IUserService } from 'src/services/iservices';
import { UserDto } from 'src/application/dto';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly service: IUserService) {}

  // @UsePipes(new ValidationPipe())
  // @Post()
  // create(@Body() createUserDto: CreateUserDto): CreateUserDto {
  //   return createUserDto;
  // }

  @Get()
  async get(): Promise<UserDto[]> {
    return this.service.get();
  }
}

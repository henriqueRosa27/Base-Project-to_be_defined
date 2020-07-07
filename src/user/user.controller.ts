import { Controller, Post, UsePipes, Body, Get, Inject } from '@nestjs/common';
import { IUserService } from './iuser.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';

@Controller('user')
export class UserController {
  constructor(@Inject('IUserService') private readonly service: IUserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return createUserDto;
  }

  @Get()
  get(): string {
    return this.service.get();
  }
}

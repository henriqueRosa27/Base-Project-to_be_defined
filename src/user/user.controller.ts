import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return createUserDto;
  }
}

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
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.service.create(createUserDto);
  }
}

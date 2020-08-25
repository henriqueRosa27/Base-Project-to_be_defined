import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Post,
  Body,
  UsePipes,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { IClassService } from 'src/services/iservices';
import { ClassDto } from 'src/application/dto/class/class.dto';
import { JwtAuthGuard } from '../guards/auth.guard';
import { UserDecorator } from 'src/application/decorators/user.decorator';
import { YupValidationPipe } from 'src/application/shared/pipes/validation.pipe';
import { classValidation } from 'src/application/validations';

@Controller('class')
export class ClassController {
  constructor(
    @Inject('IClassService') private readonly service: IClassService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getlAll(@UserDecorator('userId') userId: number): Promise<ClassDto[]> {
    return this.service.getAll(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @UserDecorator('userId') userId: number,
    @Body(new YupValidationPipe(classValidation)) dto: ClassDto,
  ): Promise<ClassDto> {
    return this.service.create(dto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body(new YupValidationPipe(classValidation)) dto: ClassDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ClassDto> {
    return this.service.update(dto, id);
  }
}

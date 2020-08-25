import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { IClassrepository } from 'src/domain/irepositories';
import { IClassService } from '../iservices';
import { ClassDto } from 'src/application/dto/class/class.dto';
import { ClassEntity, UserEntity } from 'src/domain/entities';
import { plainToClass, classToPlain } from 'class-transformer';

@Injectable()
export class ClassService implements IClassService {
  constructor(
    @Inject('IClassRepository') private repository: IClassrepository,
  ) {}

  async getAll(idUser: number): Promise<ClassDto[]> {
    return await this.repository.getAll(idUser);
  }

  async create(dto: ClassDto, userId: number): Promise<ClassDto> {
    const userEntity = new UserEntity();
    userEntity.id = userId;

    const entity = plainToClass(ClassEntity, classToPlain(dto));

    entity.teacher = userEntity;

    return await this.repository.create(entity);
  }

  async update(dto: ClassDto, id: number): Promise<ClassDto> {
    const classEntity = await this.repository.findById(id);

    if (!classEntity)
      throw new HttpException(
        { error: 'Turma não existe' },
        HttpStatus.NOT_FOUND,
      );

    classEntity.name = dto.name;
    classEntity.topic = dto.topic;

    return await this.repository.update(classEntity);
  }
}

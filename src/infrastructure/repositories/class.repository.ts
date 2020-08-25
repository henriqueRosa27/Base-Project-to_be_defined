import { IClassrepository } from 'src/domain/irepositories';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from 'src/domain/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ClassRepository implements IClassrepository {
  constructor(
    @InjectRepository(ClassEntity)
    private repository: Repository<ClassEntity>,
  ) {}

  async getAll(idUser: number): Promise<ClassEntity[]> {
    return await this.repository.find({ where: { teacher: { id: idUser } } });
  }

  findById(id: number): Promise<ClassEntity> {
    return this.repository.findOne(id);
  }

  async create(entity: ClassEntity): Promise<ClassEntity> {
    entity.id = null;
    return await this.repository.save(entity);
  }

  async update(entity: ClassEntity): Promise<ClassEntity> {
    return await this.repository.save(entity);
  }
}

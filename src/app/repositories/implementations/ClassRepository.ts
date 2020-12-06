import { Repository, EntityRepository } from 'typeorm';
import IClassRepository from '../IClassRepository';
import Class from '../../models/Class';

@EntityRepository(Class)
class ClassRepository implements IClassRepository {
  private rep: Repository<Class>;

  constructor(rep: Repository<Class>) {
    this.rep = rep;
  }

  getAll(idUser: string): Promise<Class[]> {
    return this.rep.find({
      where: { teacherId: idUser },
      relations: ['teacher'],
    });
  }

  findById(id: string): Promise<Class | undefined> {
    return this.rep.findOne(id, { relations: ['teacher'] });
  }

  findByIdIncludeStudents(id: string): Promise<Class | undefined> {
    return this.rep.findOne(id, { relations: ['teacher', 'students'] });
  }

  findByCode(code: string): Promise<Class | undefined> {
    return this.rep.findOne({
      where: { code },
      relations: ['teacher', 'students'],
    });
  }

  create(entity: Class): Promise<Class> {
    return this.rep.save(entity);
  }

  update(entity: Class): Promise<Class> {
    return this.rep.save(entity);
  }
}

export default ClassRepository;

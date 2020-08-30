import { Repository, EntityRepository } from 'typeorm';
import IClassRepository from '../IClassRepository';
import Class from '../../models/Class';

@EntityRepository(Class)
class ClassRepository implements IClassRepository {
  private rep: Repository<Class>;

  constructor(rep: Repository<Class>) {
    this.rep = rep;
  }

  getAll(): Promise<Class[]> {
    return this.rep.find();
  }
}

export default ClassRepository;

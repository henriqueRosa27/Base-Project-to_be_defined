import Class from '../models/Class';

interface IClassRepository {
  getAll(): Promise<Class[]>;

  findById(id: string): Promise<Class | undefined>;

  findByCode(code: string): Promise<Class | undefined>;

  create(entity: Class): Promise<Class>;

  update(entity: Class): Promise<Class>;
}

export default IClassRepository;

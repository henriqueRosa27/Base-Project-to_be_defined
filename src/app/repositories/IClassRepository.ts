import Class from '../models/Class';

interface IClassRepository {
  getAll(): Promise<Class[]>;
}

export default IClassRepository;

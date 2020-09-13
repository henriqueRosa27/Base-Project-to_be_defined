import Class from '../../models/Class';
import IClassRepository from '../../repositories/IClassRepository';
import AppError from '../../../errors/AppError';

interface Request {
  name: string;
  description: string;
  id: string;
}

class UpdateClass {
  private rep: IClassRepository;

  constructor(rep: IClassRepository) {
    this.rep = rep;
  }

  public async execute({ name, description, id }: Request): Promise<Class> {
    const entity = await this.rep.findById(id);
    if (!entity) {
      throw new AppError('Class not found', 404);
    }

    entity.name = name;
    entity.description = description;
    return this.rep.create(entity);
  }
}

export default UpdateClass;

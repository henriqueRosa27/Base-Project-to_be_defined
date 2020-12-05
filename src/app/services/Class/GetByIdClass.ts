import IClassRepository from '../../repositories/IClassRepository';
import Class from '../../models/Class';
import AppError from '../../../errors/AppError';

class GetByIdClass {
  private rep: IClassRepository;

  constructor(rep: IClassRepository) {
    this.rep = rep;
  }

  public async execute(id: string): Promise<Class> {
    const data = await this.rep.findById(id);
    if (data) {
      delete data?.teacher.password;
      return data;
    }
    throw new AppError('Class not found', 404);
  }
}

export default GetByIdClass;

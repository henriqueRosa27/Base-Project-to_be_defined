import IClassRepository from '../../repositories/IClassRepository';
import AppError from '../../../errors/AppError';
import User from '../../models/User';

interface Request {
  code: string;
  userId: string;
}

interface Response {
  message: string;
}

class LinkByCode {
  private rep: IClassRepository;

  constructor(rep: IClassRepository) {
    this.rep = rep;
  }

  public async execute({ code, userId }: Request): Promise<Response> {
    const entity = await this.rep.findByCode(code);

    if (!entity) {
      throw new AppError('Class not found', 404);
    }

    if (
      entity.students.some(student => student.id === userId) ||
      entity.teacher.id === userId
    ) {
      throw new AppError('User already linked', 400);
    }

    const user = new User();
    user.id = userId;

    entity.students = [...entity.students, user];

    await this.rep.update(entity);

    return {
      message: 'Usuário vinculado com sucesso',
    };
  }
}

export default LinkByCode;

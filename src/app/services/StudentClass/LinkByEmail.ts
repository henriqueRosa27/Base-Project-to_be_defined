import IClassRepository from '../../repositories/IClassRepository';
import IUserRepository from '../../repositories/IUserRepository';
import AppError from '../../../errors/AppError';

interface Request {
  email: string;
  idClass: string;
}

interface Response {
  message: string;
}

class LinkByCode {
  private repClass: IClassRepository;

  private repUser: IUserRepository;

  constructor(repClass: IClassRepository, repUser: IUserRepository) {
    this.repClass = repClass;
    this.repUser = repUser;
  }

  public async execute({ email, idClass }: Request): Promise<Response> {
    const entityClass = await this.repClass.findById(idClass);

    if (!entityClass) {
      throw new AppError('Class not found', 404);
    }

    const entityUser = await this.repUser.findByEmail(email);

    if (!entityUser) {
      throw new AppError('User not found', 404);
    }

    if (
      entityClass.students.some(student => student.id === entityUser.id) ||
      entityClass.teacher.id === entityUser.id
    ) {
      throw new AppError('User already linked', 400);
    }

    entityClass.students = [...entityClass.students, entityUser];

    await this.repClass.update(entityClass);

    return {
      message: 'Usuário vinculado com sucesso',
    };
  }
}

export default LinkByCode;

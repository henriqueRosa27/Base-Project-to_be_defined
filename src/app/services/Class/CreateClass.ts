import Class from '../../models/Class';
import IClassRepository from '../../repositories/IClassRepository';
import User from '../../models/User';

interface Request {
  name: string;
  topic: string;
  userId: string;
}

class CreateClass {
  private rep: IClassRepository;

  constructor(rep: IClassRepository) {
    this.rep = rep;
  }

  public async execute({ name, topic, userId }: Request): Promise<Class> {
    const user = new User();
    user.id = userId;

    const entity = new Class();
    entity.name = name;
    entity.topic = topic;
    entity.teacher = user;

    return this.rep.create(entity);
  }
}

export default CreateClass;

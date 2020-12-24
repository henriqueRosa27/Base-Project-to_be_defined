import uniqid from "uniqid";
import Class from "../../domain/models/Class";
import IClassRepository from "../../infra/repositories/IClassRepository";
import User from "../../domain/models/User";

interface Request {
  name: string;
  description: string;
  userId: string;
}

class CreateClass {
  private rep: IClassRepository;

  constructor(rep: IClassRepository) {
    this.rep = rep;
  }

  public async execute({ name, description, userId }: Request): Promise<Class> {
    const user = new User();
    user.id = userId;

    const entity = new Class();
    entity.name = name;
    entity.description = description;
    entity.teacher = user;
    entity.code = uniqid.time();

    return this.rep.create(entity);
  }
}

export default CreateClass;

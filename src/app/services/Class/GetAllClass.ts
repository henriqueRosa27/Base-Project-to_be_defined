import IClassRepository from '../../repositories/IClassRepository';
import Class from '../../models/Class';

class GetAllClass {
  private rep: IClassRepository;

  constructor(rep: IClassRepository) {
    this.rep = rep;
  }

  public async execute(idUser: string): Promise<Class[]> {
    const classes = await this.rep.getAll(idUser);
    return classes.map(data => {
      delete data.teacher.password;
      return data;
    });
  }
}

export default GetAllClass;

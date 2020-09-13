import IActivityRepository from '../../repositories/IActivityRepository';
import Activity from '../../models/Activity';

interface Request {
  idClass: string;
}

class GetAllActivity {
  private rep: IActivityRepository;

  constructor(rep: IActivityRepository) {
    this.rep = rep;
  }

  public async execute({ idClass }: Request): Promise<Activity[]> {
    const activities = await this.rep.getAll(idClass);
    return activities;
  }
}

export default GetAllActivity;

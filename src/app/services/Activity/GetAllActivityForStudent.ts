import IActivityRepository from "../../repositories/IActivityRepository";
import Activity from "../../models/Activity";

interface Request {
  idClass: string;
  idUser: string;
}

class GetAllActivity {
  private rep: IActivityRepository;

  constructor(rep: IActivityRepository) {
    this.rep = rep;
  }

  public async execute({ idClass, idUser }: Request): Promise<Activity[]> {
    const activities = await this.rep.getAllForStudent(idClass, idUser);
    return activities;
  }
}

export default GetAllActivity;

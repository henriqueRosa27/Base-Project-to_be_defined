import IActivityRepository from "../../infra/repositories/IActivityRepository";
import Activity from "../../domain/models/Activity";
import Class from "../../domain/models/Class";

interface Request {
  name: string;
  description: string;
  deadline: Date;
  idClass: string;
}

class CreateActivity {
  private rep: IActivityRepository;

  constructor(rep: IActivityRepository) {
    this.rep = rep;
  }

  public async execute({
    name,
    description,
    deadline,
    idClass,
  }: Request): Promise<Activity> {
    const cls = new Class();
    cls.id = idClass;

    const activity = new Activity();
    activity.name = name;
    activity.description = description;
    activity.deadline = deadline;
    activity.team = cls;

    const activitySaved = await this.rep.create(activity);

    return activitySaved;
  }
}

export default CreateActivity;

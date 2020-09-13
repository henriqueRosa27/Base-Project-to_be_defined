import IActivityRepository from '../../repositories/IActivityRepository';
import Activity from '../../models/Activity';
import AppError from '../../../errors/AppError';

interface Request {
  name: string;
  description: string;
  deadline: Date;
  id: string;
}

class UpdateActivity {
  private rep: IActivityRepository;

  constructor(rep: IActivityRepository) {
    this.rep = rep;
  }

  public async execute({
    name,
    description,
    deadline,
    id,
  }: Request): Promise<Activity> {
    const activity = await this.rep.findById(id);

    if (!activity) {
      throw new AppError('Activity not found', 404);
    }

    activity.name = name;
    activity.description = description;
    activity.deadline = deadline;

    const activitySaved = await this.rep.create(activity);

    return activitySaved;
  }
}

export default UpdateActivity;

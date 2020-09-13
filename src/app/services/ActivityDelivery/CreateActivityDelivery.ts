import IActivityDeliveryRepository from '../../repositories/IActivityDeliveryRepository';
import ActivityDelivery from '../../models/ActivityDelivery';
import Activity from '../../models/Activity';
import User from '../../models/User';

interface Request {
  note: string;
  report: string;
  file: string;
  id_activity: string;
  id_user: string;
}

class CreateActivityDelivery {
  private rep: IActivityDeliveryRepository;

  constructor(rep: IActivityDeliveryRepository) {
    this.rep = rep;
  }

  public async execute({
    note,
    report,
    file,
    id_activity,
    id_user,
  }: Request): Promise<ActivityDelivery> {
    const activity = new Activity();
    activity.id = id_activity;

    const user = new User();
    user.id = id_user;

    const activityDelivery = new ActivityDelivery();
    activityDelivery.note = note;
    activityDelivery.deliveryDate = new Date();
    activityDelivery.report = report;
    activityDelivery.image = file;
    activityDelivery.activity = activity;
    activityDelivery.student = user;

    const activitySaved = await this.rep.create(activityDelivery);

    return activitySaved;
  }
}

export default CreateActivityDelivery;

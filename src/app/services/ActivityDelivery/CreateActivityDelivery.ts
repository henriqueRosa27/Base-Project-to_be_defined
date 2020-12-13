import IActivityDeliveryRepository from '../../repositories/IActivityDeliveryRepository';
import ActivityDelivery from '../../models/ActivityDelivery';

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
    console.log(id_activity);
    const activityDelivery = new ActivityDelivery();
    activityDelivery.note = note;
    activityDelivery.deliveryDate = new Date();
    activityDelivery.report = report;
    activityDelivery.image = file;
    activityDelivery.activityId = id_activity;
    activityDelivery.studentId = id_user;

    const activitySaved = await this.rep.create(activityDelivery);

    return activitySaved;
  }
}

export default CreateActivityDelivery;

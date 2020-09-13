import IActivityDeliveryRepository from '../../repositories/IActivityDeliveryRepository';
import ActivityDelivery from '../../models/ActivityDelivery';
import AppError from '../../../errors/AppError';

interface Request {
  feedback: string;
  id: string;
}

class SendFeedbackActivitydelivery {
  private rep: IActivityDeliveryRepository;

  constructor(rep: IActivityDeliveryRepository) {
    this.rep = rep;
  }

  public async execute({ feedback, id }: Request): Promise<ActivityDelivery> {
    const activity = await this.rep.findById(id);

    if (!activity) {
      throw new AppError('Activity Delivery not found', 404);
    }

    activity.feedback = feedback;

    const activitySaved = await this.rep.create(activity);

    return activitySaved;
  }
}

export default SendFeedbackActivitydelivery;

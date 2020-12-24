import IActivityDeliveryRepository from "../../infra/repositories/IActivityDeliveryRepository";
import ActivityDelivery from "../../domain/models/ActivityDelivery";

interface Request {
  idActivity: string;
  userId: string;
}

class GetByUserActivityDelivery {
  private rep: IActivityDeliveryRepository;

  constructor(rep: IActivityDeliveryRepository) {
    this.rep = rep;
  }

  public async execute({
    idActivity,
    userId,
  }: Request): Promise<ActivityDelivery> {
    const activities = await this.rep.findByUserIdAndActivityId(
      idActivity,
      userId,
    );

    return activities || new ActivityDelivery();
  }
}

export default GetByUserActivityDelivery;

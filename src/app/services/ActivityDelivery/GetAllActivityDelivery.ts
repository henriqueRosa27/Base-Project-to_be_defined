import IActivityDeliveryRepository from "../../infra/repositories/IActivityDeliveryRepository";
import ActivityDelivery from "../../domain/models/ActivityDelivery";

interface Request {
  idActivity: string;
}

class GetAllActivityDelivery {
  private rep: IActivityDeliveryRepository;

  constructor(rep: IActivityDeliveryRepository) {
    this.rep = rep;
  }

  public async execute({ idActivity }: Request): Promise<ActivityDelivery[]> {
    const activities = await this.rep.getAll(idActivity);
    return activities;
  }
}

export default GetAllActivityDelivery;

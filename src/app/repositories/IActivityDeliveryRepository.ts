import ActivityDelivery from '../models/ActivityDelivery';

interface IActivityDeliveryRepository {
  getAll(idActivity: string): Promise<ActivityDelivery[]>;

  findById(id: string): Promise<ActivityDelivery | undefined>;

  findByUserIdAndActivityId(
    idActivity: string,
    idUser: string
  ): Promise<ActivityDelivery | undefined>;

  create(entity: ActivityDelivery): Promise<ActivityDelivery>;

  update(entity: ActivityDelivery): Promise<ActivityDelivery>;
}

export default IActivityDeliveryRepository;

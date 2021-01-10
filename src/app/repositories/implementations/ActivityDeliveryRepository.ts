import { EntityRepository, Repository } from "typeorm";
import IActivityDeliveryRepository from "../IActivityDeliveryRepository";
import ActivityDelivery from "../../models/ActivityDelivery";

@EntityRepository(ActivityDelivery)
class Activityrepository implements IActivityDeliveryRepository {
  private rep: Repository<ActivityDelivery>;

  constructor(rep: Repository<ActivityDelivery>) {
    this.rep = rep;
  }

  getAll(idClass: string): Promise<ActivityDelivery[]> {
    return this.rep.find({
      where: {
        activityId: idClass,
      },
    });
  }

  findById(id: string): Promise<ActivityDelivery | undefined> {
    return this.rep.findOne(id);
  }

  findByUserIdAndActivityId(
    activityId: string,
    idUser: string
  ): Promise<ActivityDelivery | undefined> {
    return this.rep.findOne({
      where: {
        activityId,
        studentId: idUser,
      },
    });
  }

  create(entity: ActivityDelivery): Promise<ActivityDelivery> {
    return this.rep.save(entity);
  }

  update(entity: ActivityDelivery): Promise<ActivityDelivery> {
    return this.rep.save(entity);
  }
}

export default Activityrepository;

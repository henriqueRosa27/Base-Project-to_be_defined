import { EntityRepository, Repository } from "typeorm";
import Activity from "../../models/Activity";
import IActivityRepository from "../IActivityRepository";

@EntityRepository(Activity)
class Activityrepository implements IActivityRepository {
  private rep: Repository<Activity>;

  constructor(rep: Repository<Activity>) {
    this.rep = rep;
  }

  getAllForStudent(idClass: string, idUser: string): Promise<Activity[]> {
    const teste = this.rep
      .createQueryBuilder("activity")
      .where("activity.class_id = :idClass", { idClass })
      .loadRelationCountAndMap(
        "activity.hasAnswer",
        "activity.deliveredActivities",
        "hasAnswer",
        qb => qb.where({ studentId: idUser })
      );
    return teste.getMany();
  }

  getAllForTeacher(idClass: string): Promise<Activity[]> {
    const teste = this.rep
      .createQueryBuilder("activity")
      .where("activity.class_id = :idClass", { idClass })
      .loadRelationCountAndMap(
        "activity.totalAnswer",
        "activity.deliveredActivities"
      );
    return teste.getMany();
  }

  findById(id: string): Promise<Activity | undefined> {
    return this.rep.findOne(id);
  }

  create(entity: Activity): Promise<Activity> {
    return this.rep.save(entity);
  }

  update(entity: Activity): Promise<Activity> {
    return this.rep.save(entity);
  }
}

export default Activityrepository;

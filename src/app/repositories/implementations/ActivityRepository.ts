import { EntityRepository, Repository } from 'typeorm';
import Activity from '../../models/Activity';
import IActivityRepository from '../IActivityRepository';

@EntityRepository(Activity)
class Activityrepository implements IActivityRepository {
  private rep: Repository<Activity>;

  constructor(rep: Repository<Activity>) {
    this.rep = rep;
  }

  getAll(idClass: string): Promise<Activity[]> {
    return this.rep.find({
      where: {
        team: {
          id: idClass,
        },
      },
    });
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

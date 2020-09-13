import Activity from '../models/Activity';

interface IActivityRepository {
  getAll(idClass: string): Promise<Activity[]>;

  findById(id: string): Promise<Activity | undefined>;

  create(entity: Activity): Promise<Activity>;

  update(entity: Activity): Promise<Activity>;
}

export default IActivityRepository;

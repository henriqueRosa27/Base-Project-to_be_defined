import Activity from "../models/Activity";

interface IActivityRepository {
  getAllForStudent(idClass: string, idUser: string): Promise<Activity[]>;

  getAllForTeacher(idClass: string): Promise<Activity[]>;

  findById(id: string): Promise<Activity | undefined>;

  create(entity: Activity): Promise<Activity>;

  update(entity: Activity): Promise<Activity>;
}

export default IActivityRepository;

import { Repository, EntityRepository } from "typeorm";
import IClassRepository from "../IClassRepository";
import Class from "../../../domain/models/Class";

@EntityRepository(Class)
class ClassRepository implements IClassRepository {
  private rep: Repository<Class>;

  constructor(rep: Repository<Class>) {
    this.rep = rep;
  }

  getAll(idUser: string): Promise<Class[]> {
    return this.rep
      .createQueryBuilder("class")
      .leftJoin("student_class", "std", "std.class_id = class.id")
      .leftJoinAndSelect("class.teacher", "teacher")
      .where("std.student_id = :id", { id: idUser })
      .orWhere("class.teacher_id = :id", { id: idUser })
      .getMany();
  }

  findById(id: string): Promise<Class | undefined> {
    return this.rep.findOne(id, { relations: ["teacher"] });
  }

  findByIdIncludeStudents(id: string): Promise<Class | undefined> {
    return this.rep.findOne(id, { relations: ["teacher", "students"] });
  }

  findByCode(code: string): Promise<Class | undefined> {
    return this.rep.findOne({
      where: { code },
      relations: ["teacher", "students"],
    });
  }

  create(entity: Class): Promise<Class> {
    return this.rep.save(entity);
  }

  update(entity: Class): Promise<Class> {
    return this.rep.save(entity);
  }
}

export default ClassRepository;

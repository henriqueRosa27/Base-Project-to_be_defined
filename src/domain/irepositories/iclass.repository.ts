import { ClassEntity } from "../entities";


export interface IClassrepository {
  getAll(idUser: number): Promise<ClassEntity[]>;

  findById(id: number): Promise<ClassEntity>;
  
  create(entity: ClassEntity): Promise<ClassEntity>;

  update(entity: ClassEntity): Promise<ClassEntity>;
}

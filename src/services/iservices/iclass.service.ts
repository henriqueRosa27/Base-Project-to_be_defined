import { ClassDto } from 'src/application/dto/class/class.dto';

export interface IClassService {
  getAll(idUser: number): Promise<ClassDto[]>;

  create(dto: ClassDto, idUser: number): Promise<ClassDto>;
  
  update(dto: ClassDto, id: number): Promise<ClassDto>;
}
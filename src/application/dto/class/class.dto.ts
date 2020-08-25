import { UserDto } from '..';

export class ClassDto {
  id: number;

  name: string;

  topic: string;

  teacher: UserDto;
}

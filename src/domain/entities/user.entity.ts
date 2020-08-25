import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { ClassEntity } from '.';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'surname' })
  surname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @OneToMany(
    type => ClassEntity,
    classes => classes.teacher,
  )
  classes: ClassEntity[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}

import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from '.';

@Entity('class')
export class ClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'topic' })
  topic: string;

  @ManyToOne(
    type => UserEntity,
    user => user.classes,
  )
  @JoinColumn({ name: 'teacher_id' })
  teacher: UserEntity;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import User from './User';

@Entity('class')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  topic: string;

  @Column()
  code: string;

  @ManyToOne(() => User, teacher => teacher.teaching_classes)
  @JoinColumn({ name: 'teacher_id' })
  teacher: User;

  @ManyToMany(() => User, students => students.student_classes)
  @JoinTable({
    name: 'student_class',
    joinColumn: { name: 'class_id' },
    inverseJoinColumn: { name: 'student_id' },
  })
  students: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Class;

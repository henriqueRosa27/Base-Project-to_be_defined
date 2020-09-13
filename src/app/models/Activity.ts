import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import Class from './Class';
import ActivityDelivery from './ActivityDelivery';

@Entity('activity')
class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  deadline: Date;

  @ManyToOne(() => Class, cls => cls.activities)
  @JoinColumn({ name: 'class_id' })
  team: Class;

  @OneToMany(
    () => ActivityDelivery,
    deliveredActivities => deliveredActivities.activity
  )
  deliveredActivities: Class;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Activity;

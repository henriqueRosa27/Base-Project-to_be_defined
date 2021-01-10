import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from "typeorm";
import Class from "./Class";
import ActivityDelivery from "./ActivityDelivery";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Class, teaching_classes => teaching_classes.teacher)
  teaching_classes: Class[];

  @OneToMany(
    () => ActivityDelivery,
    deliveredActivities => deliveredActivities.student
  )
  deliveredActivities: ActivityDelivery[];

  @ManyToMany(() => Class, student_classes => student_classes.students)
  student_classes: Class[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default User;

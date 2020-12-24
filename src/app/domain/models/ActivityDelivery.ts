import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Activity from "./Activity";
import User from "./User";

@Entity("activity_delivery")
class ActivityDelivery {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  note: string;

  @Column({ name: "delivery_date" })
  deliveryDate: Date;

  @Column()
  report: string;

  @Column()
  feedback: string;

  @Column()
  image: string;

  @Column({ name: "activity_id", select: false })
  activityId: string;

  @Column({ name: "student_id", select: false })
  studentId: string;

  @ManyToOne(() => Activity, (activity) => activity.deliveredActivities)
  @JoinColumn({ name: "activity_id" })
  activity: Activity;

  @ManyToOne(() => User, (student) => student.deliveredActivities)
  @JoinColumn({ name: "student_id" })
  student: User;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default ActivityDelivery;

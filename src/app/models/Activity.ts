import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  AfterLoad,
} from "typeorm";
import Class from "./Class";
import ActivityDelivery from "./ActivityDelivery";

@Entity("activity")
class Activity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  deadline: Date;

  hasAnswer: boolean;

  totalAnswer: number;

  @ManyToOne(() => Class, cls => cls.activities)
  @JoinColumn({ name: "class_id" })
  team: Class;

  @Column({ name: "class_id", select: false })
  class_id: Class;

  @OneToMany(
    () => ActivityDelivery,
    deliveredActivities => deliveredActivities.activity
  )
  deliveredActivities: ActivityDelivery[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @AfterLoad()
  getHasAnswer(): void {
    if (this.hasAnswer !== undefined) {
      this.hasAnswer = Boolean(this.hasAnswer);
    }
  }
}

export default Activity;

import { Job } from "src/jobs/job.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class ApplicantJob {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  created_by: User;

  @ManyToOne(() => Job, job => job.applications, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  job: Job;

  @Column({
    type: "boolean",
    default: false,
  })
  is_active: boolean;

  @Column({ type: "text" })
  attachment: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}

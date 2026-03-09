import { Job } from "src/jobs/job.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApplicantJob extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @ManyToOne(() => Job, job => job.applications, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  job: Job;

  @Column({ name: "is_active", type: "boolean", default: false })
  isActive: boolean;

  @Column({ type: "text" })
  attachment: string;
}

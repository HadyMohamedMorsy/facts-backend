import { ApplicantJob } from "src/applicants-job/applicant-job.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { TYPE } from "src/shared/enum/global-enum";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Job extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    title?: string;
    short_description?: string;
    description?: string;
    language_id: number;
  }>;

  @Column({ type: "enum", enum: TYPE })
  type: TYPE;

  @Column({ name: "sallary", type: "numeric" })
  salary: number;

  @Column({ type: "text" })
  featuredImage: string;

  @OneToMany(() => ApplicantJob, application => application.job, {
    cascade: true,
    onDelete: "CASCADE",
  })
  applications: ApplicantJob[];
}

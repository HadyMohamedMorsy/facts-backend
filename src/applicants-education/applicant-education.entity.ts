import { Education } from "src/educations/education.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApplicantEducation extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @ManyToOne(() => Education, education => education.applications, {
    onDelete: "CASCADE",
  })
  education: Education;

  @Column({ name: "is_active", type: "boolean", default: false })
  isActive: boolean;
}

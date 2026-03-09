import { Graduates } from "src/graduates/graduates.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ApplicantGraduates extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @ManyToOne(() => Graduates, graduate => graduate.applications, {
    onDelete: "CASCADE",
  })
  graduate: Graduates;

  @Column({ name: "is_active", type: "boolean", default: false })
  isActive: boolean;
}

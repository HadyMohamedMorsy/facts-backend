import { ApplicantGraduates } from "src/applicants-graduates/applicant-graduates.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Graduates extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "created_by" })
  createdBy: User;

  @ManyToOne(() => User, { onDelete: "SET NULL" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive: boolean;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    description: string;
    language_id: number;
  }>;

  @Column({ length: 256 })
  type: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column("simple-array")
  courses: string[];

  @Column({ name: "course_name", type: "varchar" })
  courseName: string;

  @Column({ name: "code_certification", type: "varchar" })
  codeCertification: string;

  @Column({ name: "date_course", type: "date", nullable: true })
  dateCourse?: string;

  @Column({ type: "varchar" })
  featuredImage: string;

  @Column({ type: "varchar" })
  attachment: string;

  @Column({ name: "image_certification", type: "varchar" })
  imageCertification: string;

  @OneToMany(() => ApplicantGraduates, application => application.graduate, {
    cascade: true,
    onDelete: "CASCADE",
  })
  applications: ApplicantGraduates[];
}

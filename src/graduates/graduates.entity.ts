import { ApplicantGraduates } from "src/applicants-graduates/applicant-graduates.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { createUserGraduatesDto } from "./dtos/create-graduates-users.dto";

@Entity()
export class Graduates {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "boolean",
    default: true,
  })
  is_active: boolean;

  @Column("json", { nullable: true })
  selectUser: createUserGraduatesDto;

  @OneToMany(() => ApplicantGraduates, application => application.graduate, {
    cascade: true,
    onDelete: "CASCADE",
  })
  applications: ApplicantGraduates[];

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ length: 256 })
  type: string;

  @Column({ length: 512, unique: true })
  slug: string;

  @Column({ type: "varchar" })
  description_en: string;

  @Column({ type: "varchar" })
  description_ar: string;

  @Column("simple-array")
  courses: string[];

  @Column({ type: "varchar" })
  course_name: string;

  @Column({ type: "varchar" })
  code_certification: string;

  @Column({ type: "date", nullable: true })
  date_course?: string;

  @Column({ type: "varchar" })
  featuredImage: string;

  @Column({ type: "varchar" })
  attachment: string;

  @Column({ type: "varchar" })
  image_certification: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: "created_by" })
  created_by: User;
}

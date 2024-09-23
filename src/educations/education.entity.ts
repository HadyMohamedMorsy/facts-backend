import { Base } from "src/shared/common/base/base.entity";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { EducationAccordion } from "./education-accordion.entity";

@Entity()
@Unique(["order", "language"])
export class Education extends Base {
  @Column({ length: 256 })
  title: string;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({ type: "text", nullable: true })
  short_description?: string;

  @Column({ length: 1024, nullable: true })
  featuredImage: string;

  @OneToMany(() => EducationAccordion, education => education.education, {
    cascade: true,
    eager: true,
  })
  educationAccordion?: EducationAccordion[];

  @Column({ nullable: true })
  duration: string;

  @Column({ type: "int", nullable: true })
  students_number: number;

  @Column({ type: "int", nullable: true })
  lessons_number: number;

  @Column({ nullable: true })
  skill_level: string;

  @Column({ nullable: true })
  quizzes: string;

  @Column({ nullable: true })
  certifications: string;

  @Column({ nullable: true })
  percentage: string;

  @Column({ type: "date", nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  instructor: string;
}

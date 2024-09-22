import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EducationAccordion } from "./education-accordion.entity";

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  order: number;

  @Column({
    type: "varchar",
    length: 512,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 256,
    unique: true,
  })
  slug: string;

  @Column({
    type: "text",
    nullable: true,
  })
  short_description?: string;

  @Column({
    type: "varchar",
    length: 1024,
    nullable: true,
  })
  featuredImage?: string;

  @OneToMany(() => EducationAccordion, education => education.education, {
    cascade: true,
    eager: true,
  })
  educationAccordion?: EducationAccordion[];

  @Column({
    type: "text",
    nullable: true,
  })
  duration?: string;

  @Column({
    type: "inet",
    nullable: true,
  })
  students_number?: number;

  @Column({
    type: "inet",
    nullable: true,
  })
  lessons_number?: number;

  @Column({
    type: "text",
    nullable: true,
  })
  skill_level?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  language?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  quizzes?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  certifications?: string;

  @Column({
    type: "text",
    nullable: true,
  })
  percentage?: string;

  @Column({
    type: "date",
    nullable: true,
  })
  deadline?: Date;

  @Column({
    type: "text",
    nullable: true,
  })
  instructor?: string;
}

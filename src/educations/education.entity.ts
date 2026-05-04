import { ApplicantEducation } from "src/applicants-education/applicant-education.entity";
import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EducationAccordion } from "./education-accordion.entity";
import { EducationDetails } from "./education-details.entity";

@Entity()
export class Education extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    title: string;
    intro_description?: string;
    short_description?: string;
    language_id: number;
  }>;

  @Column({ type: "varchar", length: 256, unique: true })
  slug: string;

  @Column({ type: "text" })
  featuredImage: string;

  @Column({ type: "text" })
  thumbnail: string;

  @Column({ type: "text", nullable: true })
  courseFile?: string;

  @Column({ type: "text", nullable: true })
  advisorContactLink?: string;

  @Column({ name: "education_topics", type: "json", nullable: true })
  education_topics?: Array<{
    content: Array<{
      topic_title: string;
      description?: string;
      language_id: number;
    }>;
  }>;

  @OneToMany(() => ApplicantEducation, application => application.education, {
    cascade: true,
    onDelete: "CASCADE",
  })
  applications: ApplicantEducation[];

  @OneToMany(() => EducationAccordion, accordion => accordion.education, {
    cascade: true,
  })
  education_accordion: EducationAccordion[];

  @OneToMany(() => EducationDetails, detail => detail.education, {
    cascade: true,
  })
  education_details: EducationDetails[];
}

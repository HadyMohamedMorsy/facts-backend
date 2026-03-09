import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Education } from "./education.entity";

@Entity()
export class EducationAccordion extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    accordion_title: string;
    description: string;
    language_id: number;
  }>;

  @ManyToOne(() => Education, education => education.education_accordion, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  education: Education;
}

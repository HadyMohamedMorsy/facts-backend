import { BaseMemberEntity } from "src/shared/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Education } from "./education.entity";

@Entity()
export class EducationDetails extends BaseMemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "content", type: "json", nullable: true })
  content: Array<{
    name: string;
    value: string;
    language_id: number;
  }>;

  @ManyToOne(() => Education, education => education.education_details, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  education: Education;
}
